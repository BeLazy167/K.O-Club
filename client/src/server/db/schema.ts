import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `client_${name}`);

// Define the "users" table
export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  username: varchar("username", { length: 255 }),
});

export const usersClubRelations = relations(users, ({ many }) => ({
  fights: many(fights),
  subscriptions: many(subscriptions),
}));

// Define the "accounts" table
export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

// Define the relations for the "accounts" table
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

// Define the "sessions" table
export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

// Define the relations for the "sessions" table
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

// Define the "verificationTokens" table
export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// Define the "fights" table
export const fights = createTable("fights", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  location: text("location").notNull(),
  dateTime: timestamp("date_time").notNull(),
  authorId: text("author_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  challengedId: text("challenged_id")
    .references(() => users.id)
    .notNull(),
  authorAccepted: boolean("author_accepted").default(true).notNull(),
  challengedAccepted: boolean("challenged_accepted").default(false).notNull(),
});

// Define the "subscriptions" table
export const subscriptions = createTable("subscriptions", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  fightId: text("fight_id").references(() => fights.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define the relations for the "users" table
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  fights: many(fights),
  subscriptions: many(subscriptions),
}));

// Define the relations for the "fights" table
export const fightsRelations = relations(fights, ({ many, one }) => ({
  subscriptions: many(subscriptions),
  author: one(users, {
    fields: [fights.authorId],
    references: [users.id],
  }),
  challenged: one(users, {
    fields: [fights.challengedId],
    references: [users.id],
  }),
}));

// Define the relations for the "subscriptions" table
export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  fight: one(fights, {
    fields: [subscriptions.fightId],
    references: [fights.id],
  }),
}));
