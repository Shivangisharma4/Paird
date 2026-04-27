import { pgTable, text, integer, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const availabilityEnum = pgEnum('availability', ['mornings', 'evenings', 'weekends', 'flexible']);
export const swipeActionEnum  = pgEnum('swipe_action',  ['like', 'pass']);
export const sessionStatusEnum = pgEnum('session_status', ['pending', 'active', 'completed', 'cancelled']);

export const users = pgTable('users', {
  id:        text('id').primaryKey(),          // auth provider id
  name:      text('name').notNull(),
  email:     text('email').notNull().unique(),
  avatar:    text('avatar'),
  university: text('university'),
  major:     text('major'),
  year:      text('year'),
  bio:       text('bio'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const profiles = pgTable('profiles', {
  id:           text('id').primaryKey().default('gen_random_uuid()'),
  userId:       text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  subjects:     text('subjects').array().notNull().default([]),   // what they know
  seeking:      text('seeking').array().notNull().default([]),    // what they need
  goals:        text('goals').array().notNull().default([]),      // exam-prep, project, general
  availability: availabilityEnum('availability').notNull(),
  remote:       boolean('remote').notNull().default(true),
  updatedAt:    timestamp('updated_at').defaultNow().notNull(),
});

export const swipes = pgTable('swipes', {
  id:          integer('id').primaryKey().generatedAlwaysAsIdentity(),
  fromUserId:  text('from_user_id').notNull().references(() => users.id),
  toUserId:    text('to_user_id').notNull().references(() => users.id),
  action:      swipeActionEnum('action').notNull(),
  createdAt:   timestamp('created_at').defaultNow().notNull(),
});

export const matches = pgTable('matches', {
  id:        integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userA:     text('user_a').notNull().references(() => users.id),
  userB:     text('user_b').notNull().references(() => users.id),
  matchedAt: timestamp('matched_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id:          integer('id').primaryKey().generatedAlwaysAsIdentity(),
  matchId:     integer('match_id').notNull().references(() => matches.id),
  subject:     text('subject').notNull(),
  scheduledAt: timestamp('scheduled_at').notNull(),
  duration:    integer('duration_mins').notNull().default(60),
  status:      sessionStatusEnum('status').notNull().default('pending'),
  notes:       text('notes'),
  createdAt:   timestamp('created_at').defaultNow().notNull(),
});
