import neo4j, { type Driver, type Session } from "neo4j-driver";

declare global {
  // Persist the driver across HMR in development
  // eslint-disable-next-line no-var
  var __neo4jDriver: Driver | undefined;
}

export function isNeo4jConfigured(): boolean {
  const uri = process.env.NEO4J_URI;
  const username = process.env.NEO4J_USERNAME;
  const password = process.env.NEO4J_PASSWORD;

  if (!uri || !username || !password) return false;
  if (password.startsWith("<ADD_") || password === "REPLACE_WITH_REAL_PASSWORD") return false;
  return true;
}

function createDriver(): Driver | null {
  const uri = process.env.NEO4J_URI;
  const username = process.env.NEO4J_USERNAME;
  const password = process.env.NEO4J_PASSWORD;

  if (!uri || !username || !password || password.startsWith("<ADD_") || password === "REPLACE_WITH_REAL_PASSWORD") {
    return null;
  }

  try {
    return neo4j.driver(uri, neo4j.auth.basic(username, password), {
      maxConnectionPoolSize: 50,
      connectionAcquisitionTimeout: 5000,
    });
  } catch (err) {
    console.warn("[Neo4j] Failed to initialize driver:", err instanceof Error ? err.message : err);
    return null;
  }
}

/**
 * Singleton Neo4j driver.
 * Re-uses the same instance across hot-module reloads in development.
 */
export function getDriver(): Driver | null {
  if (process.env.NODE_ENV === "development") {
    if (!global.__neo4jDriver) {
      global.__neo4jDriver = createDriver() ?? undefined;
    }
    return global.__neo4jDriver ?? null;
  }
  return createDriver();
}

/**
 * Run a Cypher query and return results.
 * Always closes the session when done.
 */
export async function runQuery<T = Record<string, unknown>>(
  cypher: string,
  params: Record<string, unknown> = {}
): Promise<T[]> {
  const driver = getDriver();
  if (!driver) {
    throw new Error("Neo4j driver is not configured or available");
  }

  const session: Session = driver.session({
    database: process.env.NEO4J_DATABASE ?? "neo4j",
  });

  try {
    const result = await session.run(cypher, params);
    return result.records.map((record) => record.toObject() as T);
  } catch (error) {
    console.error("[Neo4j] Query failed:", {
      cypherFragment: cypher.slice(0, 100),
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  } finally {
    await session.close();
  }
}

/**
 * Run a write (CREATE/MERGE/SET/DELETE) Cypher query.
 */
export async function runWrite<T = Record<string, unknown>>(
  cypher: string,
  params: Record<string, unknown> = {}
): Promise<T[]> {
  const driver = getDriver();
  if (!driver) {
    throw new Error("Neo4j driver is not configured or available");
  }

  const session: Session = driver.session({
    database: process.env.NEO4J_DATABASE ?? "neo4j",
    defaultAccessMode: neo4j.session.WRITE,
  });

  try {
    const result = await session.executeWrite((tx) =>
      tx.run(cypher, params)
    );
    return result.records.map((record) => record.toObject() as T);
  } catch (error) {
    console.error("[Neo4j] Write failed:", {
      cypherFragment: cypher.slice(0, 100),
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  } finally {
    await session.close();
  }
}

/**
 * Verify live connection to the Neo4j instance.
 */
export async function verifyConnectivity(): Promise<boolean> {
  const driver = getDriver();
  if (!driver) return false;
  try {
    const serverInfo = await driver.getServerInfo();
    return !!serverInfo;
  } catch {
    return false;
  }
}
