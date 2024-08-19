import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const ScoreCardScalarFieldEnumSchema = z.enum(['id','date','courseId']);

export const CourseScalarFieldEnumSchema = z.enum(['id','name','description','location','layout']);

export const BasketScalarFieldEnumSchema = z.enum(['id','par','length','order','courseId']);

export const ScoreScalarFieldEnumSchema = z.enum(['id','count','courseResultId','basketId']);

export const CourseResultScalarFieldEnumSchema = z.enum(['id','scoreCardId','playerId']);

export const PlayerScalarFieldEnumSchema = z.enum(['id','name','userId']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','hashedPassword','playerId']);

export const SessionScalarFieldEnumSchema = z.enum(['id','userId','expiresAt']);

export const SortOrderSchema = z.enum(['asc','desc']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// SCORE CARD SCHEMA
/////////////////////////////////////////

export const ScoreCardSchema = z.object({
  id: z.number().int(),
  date: z.coerce.date(),
  courseId: z.number().int(),
})

export type ScoreCard = z.infer<typeof ScoreCardSchema>

/////////////////////////////////////////
// COURSE SCHEMA
/////////////////////////////////////////

export const CourseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  /**
   * There are usually multiple layouts at a single course location
   */
  layout: z.string(),
})

export type Course = z.infer<typeof CourseSchema>

/////////////////////////////////////////
// BASKET SCHEMA
/////////////////////////////////////////

export const BasketSchema = z.object({
  id: z.number().int(),
  par: z.number().int(),
  length: z.number(),
  /**
   * The basket order is unique per Course
   */
  order: z.number().int(),
  courseId: z.number().int(),
})

export type Basket = z.infer<typeof BasketSchema>

/////////////////////////////////////////
// SCORE SCHEMA
/////////////////////////////////////////

export const ScoreSchema = z.object({
  id: z.number().int(),
  /**
   * The number of throws
   */
  count: z.number().int(),
  courseResultId: z.number().int(),
  basketId: z.number().int(),
})

export type Score = z.infer<typeof ScoreSchema>

/////////////////////////////////////////
// COURSE RESULT SCHEMA
/////////////////////////////////////////

export const CourseResultSchema = z.object({
  id: z.number().int(),
  scoreCardId: z.number().int(),
  playerId: z.number().int(),
})

export type CourseResult = z.infer<typeof CourseResultSchema>

/////////////////////////////////////////
// PLAYER SCHEMA
/////////////////////////////////////////

/**
 * Profile information about the player
 */
export const PlayerSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.number().int(),
})

export type Player = z.infer<typeof PlayerSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

/**
 * Authentication related user data
 */
export const UserSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  hashedPassword: z.string(),
  playerId: z.number().int(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  userId: z.number().int(),
  expiresAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// SCORE CARD
//------------------------------------------------------

export const ScoreCardIncludeSchema: z.ZodType<Prisma.ScoreCardInclude> = z.object({
  courseResults: z.union([z.boolean(),z.lazy(() => CourseResultFindManyArgsSchema)]).optional(),
  course: z.union([z.boolean(),z.lazy(() => CourseArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ScoreCardCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ScoreCardArgsSchema: z.ZodType<Prisma.ScoreCardDefaultArgs> = z.object({
  select: z.lazy(() => ScoreCardSelectSchema).optional(),
  include: z.lazy(() => ScoreCardIncludeSchema).optional(),
}).strict();

export const ScoreCardCountOutputTypeArgsSchema: z.ZodType<Prisma.ScoreCardCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ScoreCardCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ScoreCardCountOutputTypeSelectSchema: z.ZodType<Prisma.ScoreCardCountOutputTypeSelect> = z.object({
  courseResults: z.boolean().optional(),
}).strict();

export const ScoreCardSelectSchema: z.ZodType<Prisma.ScoreCardSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  courseId: z.boolean().optional(),
  courseResults: z.union([z.boolean(),z.lazy(() => CourseResultFindManyArgsSchema)]).optional(),
  course: z.union([z.boolean(),z.lazy(() => CourseArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ScoreCardCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COURSE
//------------------------------------------------------

export const CourseIncludeSchema: z.ZodType<Prisma.CourseInclude> = z.object({
  baskets: z.union([z.boolean(),z.lazy(() => BasketFindManyArgsSchema)]).optional(),
  scoreCards: z.union([z.boolean(),z.lazy(() => ScoreCardFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CourseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CourseArgsSchema: z.ZodType<Prisma.CourseDefaultArgs> = z.object({
  select: z.lazy(() => CourseSelectSchema).optional(),
  include: z.lazy(() => CourseIncludeSchema).optional(),
}).strict();

export const CourseCountOutputTypeArgsSchema: z.ZodType<Prisma.CourseCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CourseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CourseCountOutputTypeSelectSchema: z.ZodType<Prisma.CourseCountOutputTypeSelect> = z.object({
  baskets: z.boolean().optional(),
  scoreCards: z.boolean().optional(),
}).strict();

export const CourseSelectSchema: z.ZodType<Prisma.CourseSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  location: z.boolean().optional(),
  layout: z.boolean().optional(),
  baskets: z.union([z.boolean(),z.lazy(() => BasketFindManyArgsSchema)]).optional(),
  scoreCards: z.union([z.boolean(),z.lazy(() => ScoreCardFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CourseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BASKET
//------------------------------------------------------

export const BasketIncludeSchema: z.ZodType<Prisma.BasketInclude> = z.object({
  scores: z.union([z.boolean(),z.lazy(() => ScoreFindManyArgsSchema)]).optional(),
  course: z.union([z.boolean(),z.lazy(() => CourseArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BasketCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BasketArgsSchema: z.ZodType<Prisma.BasketDefaultArgs> = z.object({
  select: z.lazy(() => BasketSelectSchema).optional(),
  include: z.lazy(() => BasketIncludeSchema).optional(),
}).strict();

export const BasketCountOutputTypeArgsSchema: z.ZodType<Prisma.BasketCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BasketCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BasketCountOutputTypeSelectSchema: z.ZodType<Prisma.BasketCountOutputTypeSelect> = z.object({
  scores: z.boolean().optional(),
}).strict();

export const BasketSelectSchema: z.ZodType<Prisma.BasketSelect> = z.object({
  id: z.boolean().optional(),
  par: z.boolean().optional(),
  length: z.boolean().optional(),
  order: z.boolean().optional(),
  courseId: z.boolean().optional(),
  scores: z.union([z.boolean(),z.lazy(() => ScoreFindManyArgsSchema)]).optional(),
  course: z.union([z.boolean(),z.lazy(() => CourseArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BasketCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SCORE
//------------------------------------------------------

export const ScoreIncludeSchema: z.ZodType<Prisma.ScoreInclude> = z.object({
  courseResult: z.union([z.boolean(),z.lazy(() => CourseResultArgsSchema)]).optional(),
  basket: z.union([z.boolean(),z.lazy(() => BasketArgsSchema)]).optional(),
}).strict()

export const ScoreArgsSchema: z.ZodType<Prisma.ScoreDefaultArgs> = z.object({
  select: z.lazy(() => ScoreSelectSchema).optional(),
  include: z.lazy(() => ScoreIncludeSchema).optional(),
}).strict();

export const ScoreSelectSchema: z.ZodType<Prisma.ScoreSelect> = z.object({
  id: z.boolean().optional(),
  count: z.boolean().optional(),
  courseResultId: z.boolean().optional(),
  basketId: z.boolean().optional(),
  courseResult: z.union([z.boolean(),z.lazy(() => CourseResultArgsSchema)]).optional(),
  basket: z.union([z.boolean(),z.lazy(() => BasketArgsSchema)]).optional(),
}).strict()

// COURSE RESULT
//------------------------------------------------------

export const CourseResultIncludeSchema: z.ZodType<Prisma.CourseResultInclude> = z.object({
  scores: z.union([z.boolean(),z.lazy(() => ScoreFindManyArgsSchema)]).optional(),
  scoreCard: z.union([z.boolean(),z.lazy(() => ScoreCardArgsSchema)]).optional(),
  player: z.union([z.boolean(),z.lazy(() => PlayerArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CourseResultCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CourseResultArgsSchema: z.ZodType<Prisma.CourseResultDefaultArgs> = z.object({
  select: z.lazy(() => CourseResultSelectSchema).optional(),
  include: z.lazy(() => CourseResultIncludeSchema).optional(),
}).strict();

export const CourseResultCountOutputTypeArgsSchema: z.ZodType<Prisma.CourseResultCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CourseResultCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CourseResultCountOutputTypeSelectSchema: z.ZodType<Prisma.CourseResultCountOutputTypeSelect> = z.object({
  scores: z.boolean().optional(),
}).strict();

export const CourseResultSelectSchema: z.ZodType<Prisma.CourseResultSelect> = z.object({
  id: z.boolean().optional(),
  scoreCardId: z.boolean().optional(),
  playerId: z.boolean().optional(),
  scores: z.union([z.boolean(),z.lazy(() => ScoreFindManyArgsSchema)]).optional(),
  scoreCard: z.union([z.boolean(),z.lazy(() => ScoreCardArgsSchema)]).optional(),
  player: z.union([z.boolean(),z.lazy(() => PlayerArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CourseResultCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PLAYER
//------------------------------------------------------

export const PlayerIncludeSchema: z.ZodType<Prisma.PlayerInclude> = z.object({
  courseResults: z.union([z.boolean(),z.lazy(() => CourseResultFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PlayerCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PlayerArgsSchema: z.ZodType<Prisma.PlayerDefaultArgs> = z.object({
  select: z.lazy(() => PlayerSelectSchema).optional(),
  include: z.lazy(() => PlayerIncludeSchema).optional(),
}).strict();

export const PlayerCountOutputTypeArgsSchema: z.ZodType<Prisma.PlayerCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PlayerCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PlayerCountOutputTypeSelectSchema: z.ZodType<Prisma.PlayerCountOutputTypeSelect> = z.object({
  courseResults: z.boolean().optional(),
}).strict();

export const PlayerSelectSchema: z.ZodType<Prisma.PlayerSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  userId: z.boolean().optional(),
  courseResults: z.union([z.boolean(),z.lazy(() => CourseResultFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PlayerCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  player: z.union([z.boolean(),z.lazy(() => PlayerArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  sessions: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  hashedPassword: z.boolean().optional(),
  playerId: z.boolean().optional(),
  player: z.union([z.boolean(),z.lazy(() => PlayerArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ScoreCardWhereInputSchema: z.ZodType<Prisma.ScoreCardWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ScoreCardWhereInputSchema),z.lazy(() => ScoreCardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScoreCardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScoreCardWhereInputSchema),z.lazy(() => ScoreCardWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  courseId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  courseResults: z.lazy(() => CourseResultListRelationFilterSchema).optional(),
  course: z.union([ z.lazy(() => CourseRelationFilterSchema),z.lazy(() => CourseWhereInputSchema) ]).optional(),
}).strict();

export const ScoreCardOrderByWithRelationInputSchema: z.ZodType<Prisma.ScoreCardOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  courseResults: z.lazy(() => CourseResultOrderByRelationAggregateInputSchema).optional(),
  course: z.lazy(() => CourseOrderByWithRelationInputSchema).optional()
}).strict();

export const ScoreCardWhereUniqueInputSchema: z.ZodType<Prisma.ScoreCardWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ScoreCardWhereInputSchema),z.lazy(() => ScoreCardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScoreCardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScoreCardWhereInputSchema),z.lazy(() => ScoreCardWhereInputSchema).array() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  courseId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  courseResults: z.lazy(() => CourseResultListRelationFilterSchema).optional(),
  course: z.union([ z.lazy(() => CourseRelationFilterSchema),z.lazy(() => CourseWhereInputSchema) ]).optional(),
}).strict());

export const ScoreCardOrderByWithAggregationInputSchema: z.ZodType<Prisma.ScoreCardOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ScoreCardCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ScoreCardAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ScoreCardMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ScoreCardMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ScoreCardSumOrderByAggregateInputSchema).optional()
}).strict();

export const ScoreCardScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ScoreCardScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ScoreCardScalarWhereWithAggregatesInputSchema),z.lazy(() => ScoreCardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScoreCardScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScoreCardScalarWhereWithAggregatesInputSchema),z.lazy(() => ScoreCardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  courseId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const CourseWhereInputSchema: z.ZodType<Prisma.CourseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CourseWhereInputSchema),z.lazy(() => CourseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseWhereInputSchema),z.lazy(() => CourseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  layout: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  baskets: z.lazy(() => BasketListRelationFilterSchema).optional(),
  scoreCards: z.lazy(() => ScoreCardListRelationFilterSchema).optional()
}).strict();

export const CourseOrderByWithRelationInputSchema: z.ZodType<Prisma.CourseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  layout: z.lazy(() => SortOrderSchema).optional(),
  baskets: z.lazy(() => BasketOrderByRelationAggregateInputSchema).optional(),
  scoreCards: z.lazy(() => ScoreCardOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CourseWhereUniqueInputSchema: z.ZodType<Prisma.CourseWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => CourseWhereInputSchema),z.lazy(() => CourseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseWhereInputSchema),z.lazy(() => CourseWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  layout: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  baskets: z.lazy(() => BasketListRelationFilterSchema).optional(),
  scoreCards: z.lazy(() => ScoreCardListRelationFilterSchema).optional()
}).strict());

export const CourseOrderByWithAggregationInputSchema: z.ZodType<Prisma.CourseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  layout: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CourseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CourseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CourseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CourseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CourseSumOrderByAggregateInputSchema).optional()
}).strict();

export const CourseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CourseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CourseScalarWhereWithAggregatesInputSchema),z.lazy(() => CourseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseScalarWhereWithAggregatesInputSchema),z.lazy(() => CourseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  layout: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const BasketWhereInputSchema: z.ZodType<Prisma.BasketWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BasketWhereInputSchema),z.lazy(() => BasketWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BasketWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BasketWhereInputSchema),z.lazy(() => BasketWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  par: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  length: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  courseId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  scores: z.lazy(() => ScoreListRelationFilterSchema).optional(),
  course: z.union([ z.lazy(() => CourseRelationFilterSchema),z.lazy(() => CourseWhereInputSchema) ]).optional(),
}).strict();

export const BasketOrderByWithRelationInputSchema: z.ZodType<Prisma.BasketOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  par: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  scores: z.lazy(() => ScoreOrderByRelationAggregateInputSchema).optional(),
  course: z.lazy(() => CourseOrderByWithRelationInputSchema).optional()
}).strict();

export const BasketWhereUniqueInputSchema: z.ZodType<Prisma.BasketWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => BasketWhereInputSchema),z.lazy(() => BasketWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BasketWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BasketWhereInputSchema),z.lazy(() => BasketWhereInputSchema).array() ]).optional(),
  par: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  length: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  courseId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  scores: z.lazy(() => ScoreListRelationFilterSchema).optional(),
  course: z.union([ z.lazy(() => CourseRelationFilterSchema),z.lazy(() => CourseWhereInputSchema) ]).optional(),
}).strict());

export const BasketOrderByWithAggregationInputSchema: z.ZodType<Prisma.BasketOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  par: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BasketCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BasketAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BasketMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BasketMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BasketSumOrderByAggregateInputSchema).optional()
}).strict();

export const BasketScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BasketScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BasketScalarWhereWithAggregatesInputSchema),z.lazy(() => BasketScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BasketScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BasketScalarWhereWithAggregatesInputSchema),z.lazy(() => BasketScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  par: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  length: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  courseId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const ScoreWhereInputSchema: z.ZodType<Prisma.ScoreWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ScoreWhereInputSchema),z.lazy(() => ScoreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScoreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScoreWhereInputSchema),z.lazy(() => ScoreWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  count: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  courseResultId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  basketId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  courseResult: z.union([ z.lazy(() => CourseResultRelationFilterSchema),z.lazy(() => CourseResultWhereInputSchema) ]).optional(),
  basket: z.union([ z.lazy(() => BasketRelationFilterSchema),z.lazy(() => BasketWhereInputSchema) ]).optional(),
}).strict();

export const ScoreOrderByWithRelationInputSchema: z.ZodType<Prisma.ScoreOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  count: z.lazy(() => SortOrderSchema).optional(),
  courseResultId: z.lazy(() => SortOrderSchema).optional(),
  basketId: z.lazy(() => SortOrderSchema).optional(),
  courseResult: z.lazy(() => CourseResultOrderByWithRelationInputSchema).optional(),
  basket: z.lazy(() => BasketOrderByWithRelationInputSchema).optional()
}).strict();

export const ScoreWhereUniqueInputSchema: z.ZodType<Prisma.ScoreWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ScoreWhereInputSchema),z.lazy(() => ScoreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScoreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScoreWhereInputSchema),z.lazy(() => ScoreWhereInputSchema).array() ]).optional(),
  count: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  courseResultId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  basketId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  courseResult: z.union([ z.lazy(() => CourseResultRelationFilterSchema),z.lazy(() => CourseResultWhereInputSchema) ]).optional(),
  basket: z.union([ z.lazy(() => BasketRelationFilterSchema),z.lazy(() => BasketWhereInputSchema) ]).optional(),
}).strict());

export const ScoreOrderByWithAggregationInputSchema: z.ZodType<Prisma.ScoreOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  count: z.lazy(() => SortOrderSchema).optional(),
  courseResultId: z.lazy(() => SortOrderSchema).optional(),
  basketId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ScoreCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ScoreAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ScoreMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ScoreMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ScoreSumOrderByAggregateInputSchema).optional()
}).strict();

export const ScoreScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ScoreScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ScoreScalarWhereWithAggregatesInputSchema),z.lazy(() => ScoreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScoreScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScoreScalarWhereWithAggregatesInputSchema),z.lazy(() => ScoreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  count: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  courseResultId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  basketId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const CourseResultWhereInputSchema: z.ZodType<Prisma.CourseResultWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CourseResultWhereInputSchema),z.lazy(() => CourseResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseResultWhereInputSchema),z.lazy(() => CourseResultWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  scoreCardId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  playerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  scores: z.lazy(() => ScoreListRelationFilterSchema).optional(),
  scoreCard: z.union([ z.lazy(() => ScoreCardRelationFilterSchema),z.lazy(() => ScoreCardWhereInputSchema) ]).optional(),
  player: z.union([ z.lazy(() => PlayerRelationFilterSchema),z.lazy(() => PlayerWhereInputSchema) ]).optional(),
}).strict();

export const CourseResultOrderByWithRelationInputSchema: z.ZodType<Prisma.CourseResultOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scoreCardId: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional(),
  scores: z.lazy(() => ScoreOrderByRelationAggregateInputSchema).optional(),
  scoreCard: z.lazy(() => ScoreCardOrderByWithRelationInputSchema).optional(),
  player: z.lazy(() => PlayerOrderByWithRelationInputSchema).optional()
}).strict();

export const CourseResultWhereUniqueInputSchema: z.ZodType<Prisma.CourseResultWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CourseResultWhereInputSchema),z.lazy(() => CourseResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseResultWhereInputSchema),z.lazy(() => CourseResultWhereInputSchema).array() ]).optional(),
  scoreCardId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  playerId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  scores: z.lazy(() => ScoreListRelationFilterSchema).optional(),
  scoreCard: z.union([ z.lazy(() => ScoreCardRelationFilterSchema),z.lazy(() => ScoreCardWhereInputSchema) ]).optional(),
  player: z.union([ z.lazy(() => PlayerRelationFilterSchema),z.lazy(() => PlayerWhereInputSchema) ]).optional(),
}).strict());

export const CourseResultOrderByWithAggregationInputSchema: z.ZodType<Prisma.CourseResultOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scoreCardId: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CourseResultCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CourseResultAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CourseResultMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CourseResultMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CourseResultSumOrderByAggregateInputSchema).optional()
}).strict();

export const CourseResultScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CourseResultScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CourseResultScalarWhereWithAggregatesInputSchema),z.lazy(() => CourseResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseResultScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseResultScalarWhereWithAggregatesInputSchema),z.lazy(() => CourseResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  scoreCardId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  playerId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const PlayerWhereInputSchema: z.ZodType<Prisma.PlayerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlayerWhereInputSchema),z.lazy(() => PlayerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerWhereInputSchema),z.lazy(() => PlayerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  courseResults: z.lazy(() => CourseResultListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PlayerOrderByWithRelationInputSchema: z.ZodType<Prisma.PlayerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  courseResults: z.lazy(() => CourseResultOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PlayerWhereUniqueInputSchema: z.ZodType<Prisma.PlayerWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    userId: z.number().int()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    userId: z.number().int(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  userId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PlayerWhereInputSchema),z.lazy(() => PlayerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerWhereInputSchema),z.lazy(() => PlayerWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  courseResults: z.lazy(() => CourseResultListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const PlayerOrderByWithAggregationInputSchema: z.ZodType<Prisma.PlayerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PlayerCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PlayerAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PlayerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PlayerMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PlayerSumOrderByAggregateInputSchema).optional()
}).strict();

export const PlayerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PlayerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema),z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema),z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  playerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  player: z.union([ z.lazy(() => PlayerNullableRelationFilterSchema),z.lazy(() => PlayerWhereInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional(),
  player: z.lazy(() => PlayerOrderByWithRelationInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    username: z.string(),
    playerId: z.number().int()
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
  }),
  z.object({
    id: z.number().int(),
    playerId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    username: z.string(),
    playerId: z.number().int(),
  }),
  z.object({
    username: z.string(),
  }),
  z.object({
    playerId: z.number().int(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  playerId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  player: z.union([ z.lazy(() => PlayerNullableRelationFilterSchema),z.lazy(() => PlayerWhereInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  playerId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SessionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SessionSumOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ScoreCardCreateInputSchema: z.ZodType<Prisma.ScoreCardCreateInput> = z.object({
  date: z.coerce.date(),
  courseResults: z.lazy(() => CourseResultCreateNestedManyWithoutScoreCardInputSchema).optional(),
  course: z.lazy(() => CourseCreateNestedOneWithoutScoreCardsInputSchema)
}).strict();

export const ScoreCardUncheckedCreateInputSchema: z.ZodType<Prisma.ScoreCardUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  courseId: z.number().int(),
  courseResults: z.lazy(() => CourseResultUncheckedCreateNestedManyWithoutScoreCardInputSchema).optional()
}).strict();

export const ScoreCardUpdateInputSchema: z.ZodType<Prisma.ScoreCardUpdateInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  courseResults: z.lazy(() => CourseResultUpdateManyWithoutScoreCardNestedInputSchema).optional(),
  course: z.lazy(() => CourseUpdateOneRequiredWithoutScoreCardsNestedInputSchema).optional()
}).strict();

export const ScoreCardUncheckedUpdateInputSchema: z.ZodType<Prisma.ScoreCardUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  courseResults: z.lazy(() => CourseResultUncheckedUpdateManyWithoutScoreCardNestedInputSchema).optional()
}).strict();

export const ScoreCardCreateManyInputSchema: z.ZodType<Prisma.ScoreCardCreateManyInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  courseId: z.number().int()
}).strict();

export const ScoreCardUpdateManyMutationInputSchema: z.ZodType<Prisma.ScoreCardUpdateManyMutationInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreCardUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ScoreCardUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CourseCreateInputSchema: z.ZodType<Prisma.CourseCreateInput> = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  layout: z.string(),
  baskets: z.lazy(() => BasketCreateNestedManyWithoutCourseInputSchema).optional(),
  scoreCards: z.lazy(() => ScoreCardCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseUncheckedCreateInputSchema: z.ZodType<Prisma.CourseUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  layout: z.string(),
  baskets: z.lazy(() => BasketUncheckedCreateNestedManyWithoutCourseInputSchema).optional(),
  scoreCards: z.lazy(() => ScoreCardUncheckedCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseUpdateInputSchema: z.ZodType<Prisma.CourseUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  layout: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baskets: z.lazy(() => BasketUpdateManyWithoutCourseNestedInputSchema).optional(),
  scoreCards: z.lazy(() => ScoreCardUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseUncheckedUpdateInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  layout: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baskets: z.lazy(() => BasketUncheckedUpdateManyWithoutCourseNestedInputSchema).optional(),
  scoreCards: z.lazy(() => ScoreCardUncheckedUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseCreateManyInputSchema: z.ZodType<Prisma.CourseCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  layout: z.string()
}).strict();

export const CourseUpdateManyMutationInputSchema: z.ZodType<Prisma.CourseUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  layout: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CourseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  layout: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BasketCreateInputSchema: z.ZodType<Prisma.BasketCreateInput> = z.object({
  par: z.number().int(),
  length: z.number(),
  order: z.number().int(),
  scores: z.lazy(() => ScoreCreateNestedManyWithoutBasketInputSchema).optional(),
  course: z.lazy(() => CourseCreateNestedOneWithoutBasketsInputSchema)
}).strict();

export const BasketUncheckedCreateInputSchema: z.ZodType<Prisma.BasketUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  par: z.number().int(),
  length: z.number(),
  order: z.number().int(),
  courseId: z.number().int(),
  scores: z.lazy(() => ScoreUncheckedCreateNestedManyWithoutBasketInputSchema).optional()
}).strict();

export const BasketUpdateInputSchema: z.ZodType<Prisma.BasketUpdateInput> = z.object({
  par: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scores: z.lazy(() => ScoreUpdateManyWithoutBasketNestedInputSchema).optional(),
  course: z.lazy(() => CourseUpdateOneRequiredWithoutBasketsNestedInputSchema).optional()
}).strict();

export const BasketUncheckedUpdateInputSchema: z.ZodType<Prisma.BasketUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  par: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scores: z.lazy(() => ScoreUncheckedUpdateManyWithoutBasketNestedInputSchema).optional()
}).strict();

export const BasketCreateManyInputSchema: z.ZodType<Prisma.BasketCreateManyInput> = z.object({
  id: z.number().int().optional(),
  par: z.number().int(),
  length: z.number(),
  order: z.number().int(),
  courseId: z.number().int()
}).strict();

export const BasketUpdateManyMutationInputSchema: z.ZodType<Prisma.BasketUpdateManyMutationInput> = z.object({
  par: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BasketUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BasketUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  par: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreCreateInputSchema: z.ZodType<Prisma.ScoreCreateInput> = z.object({
  count: z.number().int(),
  courseResult: z.lazy(() => CourseResultCreateNestedOneWithoutScoresInputSchema),
  basket: z.lazy(() => BasketCreateNestedOneWithoutScoresInputSchema)
}).strict();

export const ScoreUncheckedCreateInputSchema: z.ZodType<Prisma.ScoreUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  count: z.number().int(),
  courseResultId: z.number().int(),
  basketId: z.number().int()
}).strict();

export const ScoreUpdateInputSchema: z.ZodType<Prisma.ScoreUpdateInput> = z.object({
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  courseResult: z.lazy(() => CourseResultUpdateOneRequiredWithoutScoresNestedInputSchema).optional(),
  basket: z.lazy(() => BasketUpdateOneRequiredWithoutScoresNestedInputSchema).optional()
}).strict();

export const ScoreUncheckedUpdateInputSchema: z.ZodType<Prisma.ScoreUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  courseResultId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  basketId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreCreateManyInputSchema: z.ZodType<Prisma.ScoreCreateManyInput> = z.object({
  id: z.number().int().optional(),
  count: z.number().int(),
  courseResultId: z.number().int(),
  basketId: z.number().int()
}).strict();

export const ScoreUpdateManyMutationInputSchema: z.ZodType<Prisma.ScoreUpdateManyMutationInput> = z.object({
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ScoreUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  courseResultId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  basketId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CourseResultCreateInputSchema: z.ZodType<Prisma.CourseResultCreateInput> = z.object({
  scores: z.lazy(() => ScoreCreateNestedManyWithoutCourseResultInputSchema).optional(),
  scoreCard: z.lazy(() => ScoreCardCreateNestedOneWithoutCourseResultsInputSchema),
  player: z.lazy(() => PlayerCreateNestedOneWithoutCourseResultsInputSchema)
}).strict();

export const CourseResultUncheckedCreateInputSchema: z.ZodType<Prisma.CourseResultUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  scoreCardId: z.number().int(),
  playerId: z.number().int(),
  scores: z.lazy(() => ScoreUncheckedCreateNestedManyWithoutCourseResultInputSchema).optional()
}).strict();

export const CourseResultUpdateInputSchema: z.ZodType<Prisma.CourseResultUpdateInput> = z.object({
  scores: z.lazy(() => ScoreUpdateManyWithoutCourseResultNestedInputSchema).optional(),
  scoreCard: z.lazy(() => ScoreCardUpdateOneRequiredWithoutCourseResultsNestedInputSchema).optional(),
  player: z.lazy(() => PlayerUpdateOneRequiredWithoutCourseResultsNestedInputSchema).optional()
}).strict();

export const CourseResultUncheckedUpdateInputSchema: z.ZodType<Prisma.CourseResultUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scoreCardId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scores: z.lazy(() => ScoreUncheckedUpdateManyWithoutCourseResultNestedInputSchema).optional()
}).strict();

export const CourseResultCreateManyInputSchema: z.ZodType<Prisma.CourseResultCreateManyInput> = z.object({
  id: z.number().int().optional(),
  scoreCardId: z.number().int(),
  playerId: z.number().int()
}).strict();

export const CourseResultUpdateManyMutationInputSchema: z.ZodType<Prisma.CourseResultUpdateManyMutationInput> = z.object({
}).strict();

export const CourseResultUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CourseResultUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scoreCardId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerCreateInputSchema: z.ZodType<Prisma.PlayerCreateInput> = z.object({
  name: z.string(),
  courseResults: z.lazy(() => CourseResultCreateNestedManyWithoutPlayerInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPlayerInputSchema)
}).strict();

export const PlayerUncheckedCreateInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  userId: z.number().int(),
  courseResults: z.lazy(() => CourseResultUncheckedCreateNestedManyWithoutPlayerInputSchema).optional()
}).strict();

export const PlayerUpdateInputSchema: z.ZodType<Prisma.PlayerUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  courseResults: z.lazy(() => CourseResultUpdateManyWithoutPlayerNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPlayerNestedInputSchema).optional()
}).strict();

export const PlayerUncheckedUpdateInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  courseResults: z.lazy(() => CourseResultUncheckedUpdateManyWithoutPlayerNestedInputSchema).optional()
}).strict();

export const PlayerCreateManyInputSchema: z.ZodType<Prisma.PlayerCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  userId: z.number().int()
}).strict();

export const PlayerUpdateManyMutationInputSchema: z.ZodType<Prisma.PlayerUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  username: z.string(),
  hashedPassword: z.string(),
  playerId: z.number().int(),
  player: z.lazy(() => PlayerCreateNestedOneWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  hashedPassword: z.string(),
  playerId: z.number().int(),
  player: z.lazy(() => PlayerUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  player: z.lazy(() => PlayerUpdateOneWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  player: z.lazy(() => PlayerUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  hashedPassword: z.string(),
  playerId: z.number().int()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string(),
  userId: z.number().int(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string(),
  userId: z.number().int(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const CourseResultListRelationFilterSchema: z.ZodType<Prisma.CourseResultListRelationFilter> = z.object({
  every: z.lazy(() => CourseResultWhereInputSchema).optional(),
  some: z.lazy(() => CourseResultWhereInputSchema).optional(),
  none: z.lazy(() => CourseResultWhereInputSchema).optional()
}).strict();

export const CourseRelationFilterSchema: z.ZodType<Prisma.CourseRelationFilter> = z.object({
  is: z.lazy(() => CourseWhereInputSchema).optional(),
  isNot: z.lazy(() => CourseWhereInputSchema).optional()
}).strict();

export const CourseResultOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CourseResultOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreCardCountOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreCardCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreCardAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreCardAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreCardMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreCardMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreCardMinOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreCardMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreCardSumOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreCardSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BasketListRelationFilterSchema: z.ZodType<Prisma.BasketListRelationFilter> = z.object({
  every: z.lazy(() => BasketWhereInputSchema).optional(),
  some: z.lazy(() => BasketWhereInputSchema).optional(),
  none: z.lazy(() => BasketWhereInputSchema).optional()
}).strict();

export const ScoreCardListRelationFilterSchema: z.ZodType<Prisma.ScoreCardListRelationFilter> = z.object({
  every: z.lazy(() => ScoreCardWhereInputSchema).optional(),
  some: z.lazy(() => ScoreCardWhereInputSchema).optional(),
  none: z.lazy(() => ScoreCardWhereInputSchema).optional()
}).strict();

export const BasketOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BasketOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreCardOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ScoreCardOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseCountOrderByAggregateInputSchema: z.ZodType<Prisma.CourseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  layout: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CourseAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CourseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  layout: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseMinOrderByAggregateInputSchema: z.ZodType<Prisma.CourseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  layout: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseSumOrderByAggregateInputSchema: z.ZodType<Prisma.CourseSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const ScoreListRelationFilterSchema: z.ZodType<Prisma.ScoreListRelationFilter> = z.object({
  every: z.lazy(() => ScoreWhereInputSchema).optional(),
  some: z.lazy(() => ScoreWhereInputSchema).optional(),
  none: z.lazy(() => ScoreWhereInputSchema).optional()
}).strict();

export const ScoreOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ScoreOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BasketCountOrderByAggregateInputSchema: z.ZodType<Prisma.BasketCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  par: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BasketAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BasketAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  par: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BasketMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BasketMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  par: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BasketMinOrderByAggregateInputSchema: z.ZodType<Prisma.BasketMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  par: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BasketSumOrderByAggregateInputSchema: z.ZodType<Prisma.BasketSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  par: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const CourseResultRelationFilterSchema: z.ZodType<Prisma.CourseResultRelationFilter> = z.object({
  is: z.lazy(() => CourseResultWhereInputSchema).optional(),
  isNot: z.lazy(() => CourseResultWhereInputSchema).optional()
}).strict();

export const BasketRelationFilterSchema: z.ZodType<Prisma.BasketRelationFilter> = z.object({
  is: z.lazy(() => BasketWhereInputSchema).optional(),
  isNot: z.lazy(() => BasketWhereInputSchema).optional()
}).strict();

export const ScoreCountOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  count: z.lazy(() => SortOrderSchema).optional(),
  courseResultId: z.lazy(() => SortOrderSchema).optional(),
  basketId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  count: z.lazy(() => SortOrderSchema).optional(),
  courseResultId: z.lazy(() => SortOrderSchema).optional(),
  basketId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  count: z.lazy(() => SortOrderSchema).optional(),
  courseResultId: z.lazy(() => SortOrderSchema).optional(),
  basketId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreMinOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  count: z.lazy(() => SortOrderSchema).optional(),
  courseResultId: z.lazy(() => SortOrderSchema).optional(),
  basketId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreSumOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  count: z.lazy(() => SortOrderSchema).optional(),
  courseResultId: z.lazy(() => SortOrderSchema).optional(),
  basketId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreCardRelationFilterSchema: z.ZodType<Prisma.ScoreCardRelationFilter> = z.object({
  is: z.lazy(() => ScoreCardWhereInputSchema).optional(),
  isNot: z.lazy(() => ScoreCardWhereInputSchema).optional()
}).strict();

export const PlayerRelationFilterSchema: z.ZodType<Prisma.PlayerRelationFilter> = z.object({
  is: z.lazy(() => PlayerWhereInputSchema).optional(),
  isNot: z.lazy(() => PlayerWhereInputSchema).optional()
}).strict();

export const CourseResultCountOrderByAggregateInputSchema: z.ZodType<Prisma.CourseResultCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scoreCardId: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseResultAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CourseResultAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scoreCardId: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseResultMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CourseResultMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scoreCardId: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseResultMinOrderByAggregateInputSchema: z.ZodType<Prisma.CourseResultMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scoreCardId: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseResultSumOrderByAggregateInputSchema: z.ZodType<Prisma.CourseResultSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scoreCardId: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const PlayerCountOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerMinOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerSumOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerNullableRelationFilterSchema: z.ZodType<Prisma.PlayerNullableRelationFilter> = z.object({
  is: z.lazy(() => PlayerWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PlayerWhereInputSchema).optional().nullable()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  playerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SessionAvgOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionSumOrderByAggregateInputSchema: z.ZodType<Prisma.SessionSumOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseResultCreateNestedManyWithoutScoreCardInputSchema: z.ZodType<Prisma.CourseResultCreateNestedManyWithoutScoreCardInput> = z.object({
  create: z.union([ z.lazy(() => CourseResultCreateWithoutScoreCardInputSchema),z.lazy(() => CourseResultCreateWithoutScoreCardInputSchema).array(),z.lazy(() => CourseResultUncheckedCreateWithoutScoreCardInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutScoreCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseResultCreateOrConnectWithoutScoreCardInputSchema),z.lazy(() => CourseResultCreateOrConnectWithoutScoreCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CourseResultCreateManyScoreCardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CourseCreateNestedOneWithoutScoreCardsInputSchema: z.ZodType<Prisma.CourseCreateNestedOneWithoutScoreCardsInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutScoreCardsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutScoreCardsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CourseCreateOrConnectWithoutScoreCardsInputSchema).optional(),
  connect: z.lazy(() => CourseWhereUniqueInputSchema).optional()
}).strict();

export const CourseResultUncheckedCreateNestedManyWithoutScoreCardInputSchema: z.ZodType<Prisma.CourseResultUncheckedCreateNestedManyWithoutScoreCardInput> = z.object({
  create: z.union([ z.lazy(() => CourseResultCreateWithoutScoreCardInputSchema),z.lazy(() => CourseResultCreateWithoutScoreCardInputSchema).array(),z.lazy(() => CourseResultUncheckedCreateWithoutScoreCardInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutScoreCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseResultCreateOrConnectWithoutScoreCardInputSchema),z.lazy(() => CourseResultCreateOrConnectWithoutScoreCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CourseResultCreateManyScoreCardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const CourseResultUpdateManyWithoutScoreCardNestedInputSchema: z.ZodType<Prisma.CourseResultUpdateManyWithoutScoreCardNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseResultCreateWithoutScoreCardInputSchema),z.lazy(() => CourseResultCreateWithoutScoreCardInputSchema).array(),z.lazy(() => CourseResultUncheckedCreateWithoutScoreCardInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutScoreCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseResultCreateOrConnectWithoutScoreCardInputSchema),z.lazy(() => CourseResultCreateOrConnectWithoutScoreCardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CourseResultUpsertWithWhereUniqueWithoutScoreCardInputSchema),z.lazy(() => CourseResultUpsertWithWhereUniqueWithoutScoreCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CourseResultCreateManyScoreCardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CourseResultUpdateWithWhereUniqueWithoutScoreCardInputSchema),z.lazy(() => CourseResultUpdateWithWhereUniqueWithoutScoreCardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CourseResultUpdateManyWithWhereWithoutScoreCardInputSchema),z.lazy(() => CourseResultUpdateManyWithWhereWithoutScoreCardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CourseResultScalarWhereInputSchema),z.lazy(() => CourseResultScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CourseUpdateOneRequiredWithoutScoreCardsNestedInputSchema: z.ZodType<Prisma.CourseUpdateOneRequiredWithoutScoreCardsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutScoreCardsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutScoreCardsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CourseCreateOrConnectWithoutScoreCardsInputSchema).optional(),
  upsert: z.lazy(() => CourseUpsertWithoutScoreCardsInputSchema).optional(),
  connect: z.lazy(() => CourseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CourseUpdateToOneWithWhereWithoutScoreCardsInputSchema),z.lazy(() => CourseUpdateWithoutScoreCardsInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutScoreCardsInputSchema) ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const CourseResultUncheckedUpdateManyWithoutScoreCardNestedInputSchema: z.ZodType<Prisma.CourseResultUncheckedUpdateManyWithoutScoreCardNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseResultCreateWithoutScoreCardInputSchema),z.lazy(() => CourseResultCreateWithoutScoreCardInputSchema).array(),z.lazy(() => CourseResultUncheckedCreateWithoutScoreCardInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutScoreCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseResultCreateOrConnectWithoutScoreCardInputSchema),z.lazy(() => CourseResultCreateOrConnectWithoutScoreCardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CourseResultUpsertWithWhereUniqueWithoutScoreCardInputSchema),z.lazy(() => CourseResultUpsertWithWhereUniqueWithoutScoreCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CourseResultCreateManyScoreCardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CourseResultUpdateWithWhereUniqueWithoutScoreCardInputSchema),z.lazy(() => CourseResultUpdateWithWhereUniqueWithoutScoreCardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CourseResultUpdateManyWithWhereWithoutScoreCardInputSchema),z.lazy(() => CourseResultUpdateManyWithWhereWithoutScoreCardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CourseResultScalarWhereInputSchema),z.lazy(() => CourseResultScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BasketCreateNestedManyWithoutCourseInputSchema: z.ZodType<Prisma.BasketCreateNestedManyWithoutCourseInput> = z.object({
  create: z.union([ z.lazy(() => BasketCreateWithoutCourseInputSchema),z.lazy(() => BasketCreateWithoutCourseInputSchema).array(),z.lazy(() => BasketUncheckedCreateWithoutCourseInputSchema),z.lazy(() => BasketUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BasketCreateOrConnectWithoutCourseInputSchema),z.lazy(() => BasketCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BasketCreateManyCourseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BasketWhereUniqueInputSchema),z.lazy(() => BasketWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ScoreCardCreateNestedManyWithoutCourseInputSchema: z.ZodType<Prisma.ScoreCardCreateNestedManyWithoutCourseInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCardCreateWithoutCourseInputSchema),z.lazy(() => ScoreCardCreateWithoutCourseInputSchema).array(),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseInputSchema),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScoreCardCreateOrConnectWithoutCourseInputSchema),z.lazy(() => ScoreCardCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScoreCardCreateManyCourseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScoreCardWhereUniqueInputSchema),z.lazy(() => ScoreCardWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BasketUncheckedCreateNestedManyWithoutCourseInputSchema: z.ZodType<Prisma.BasketUncheckedCreateNestedManyWithoutCourseInput> = z.object({
  create: z.union([ z.lazy(() => BasketCreateWithoutCourseInputSchema),z.lazy(() => BasketCreateWithoutCourseInputSchema).array(),z.lazy(() => BasketUncheckedCreateWithoutCourseInputSchema),z.lazy(() => BasketUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BasketCreateOrConnectWithoutCourseInputSchema),z.lazy(() => BasketCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BasketCreateManyCourseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BasketWhereUniqueInputSchema),z.lazy(() => BasketWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ScoreCardUncheckedCreateNestedManyWithoutCourseInputSchema: z.ZodType<Prisma.ScoreCardUncheckedCreateNestedManyWithoutCourseInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCardCreateWithoutCourseInputSchema),z.lazy(() => ScoreCardCreateWithoutCourseInputSchema).array(),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseInputSchema),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScoreCardCreateOrConnectWithoutCourseInputSchema),z.lazy(() => ScoreCardCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScoreCardCreateManyCourseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScoreCardWhereUniqueInputSchema),z.lazy(() => ScoreCardWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BasketUpdateManyWithoutCourseNestedInputSchema: z.ZodType<Prisma.BasketUpdateManyWithoutCourseNestedInput> = z.object({
  create: z.union([ z.lazy(() => BasketCreateWithoutCourseInputSchema),z.lazy(() => BasketCreateWithoutCourseInputSchema).array(),z.lazy(() => BasketUncheckedCreateWithoutCourseInputSchema),z.lazy(() => BasketUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BasketCreateOrConnectWithoutCourseInputSchema),z.lazy(() => BasketCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BasketUpsertWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => BasketUpsertWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BasketCreateManyCourseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BasketWhereUniqueInputSchema),z.lazy(() => BasketWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BasketWhereUniqueInputSchema),z.lazy(() => BasketWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BasketWhereUniqueInputSchema),z.lazy(() => BasketWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BasketWhereUniqueInputSchema),z.lazy(() => BasketWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BasketUpdateWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => BasketUpdateWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BasketUpdateManyWithWhereWithoutCourseInputSchema),z.lazy(() => BasketUpdateManyWithWhereWithoutCourseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BasketScalarWhereInputSchema),z.lazy(() => BasketScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ScoreCardUpdateManyWithoutCourseNestedInputSchema: z.ZodType<Prisma.ScoreCardUpdateManyWithoutCourseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCardCreateWithoutCourseInputSchema),z.lazy(() => ScoreCardCreateWithoutCourseInputSchema).array(),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseInputSchema),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScoreCardCreateOrConnectWithoutCourseInputSchema),z.lazy(() => ScoreCardCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScoreCardUpsertWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => ScoreCardUpsertWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScoreCardCreateManyCourseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScoreCardWhereUniqueInputSchema),z.lazy(() => ScoreCardWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScoreCardWhereUniqueInputSchema),z.lazy(() => ScoreCardWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScoreCardWhereUniqueInputSchema),z.lazy(() => ScoreCardWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScoreCardWhereUniqueInputSchema),z.lazy(() => ScoreCardWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScoreCardUpdateWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => ScoreCardUpdateWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScoreCardUpdateManyWithWhereWithoutCourseInputSchema),z.lazy(() => ScoreCardUpdateManyWithWhereWithoutCourseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScoreCardScalarWhereInputSchema),z.lazy(() => ScoreCardScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BasketUncheckedUpdateManyWithoutCourseNestedInputSchema: z.ZodType<Prisma.BasketUncheckedUpdateManyWithoutCourseNestedInput> = z.object({
  create: z.union([ z.lazy(() => BasketCreateWithoutCourseInputSchema),z.lazy(() => BasketCreateWithoutCourseInputSchema).array(),z.lazy(() => BasketUncheckedCreateWithoutCourseInputSchema),z.lazy(() => BasketUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BasketCreateOrConnectWithoutCourseInputSchema),z.lazy(() => BasketCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BasketUpsertWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => BasketUpsertWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BasketCreateManyCourseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BasketWhereUniqueInputSchema),z.lazy(() => BasketWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BasketWhereUniqueInputSchema),z.lazy(() => BasketWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BasketWhereUniqueInputSchema),z.lazy(() => BasketWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BasketWhereUniqueInputSchema),z.lazy(() => BasketWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BasketUpdateWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => BasketUpdateWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BasketUpdateManyWithWhereWithoutCourseInputSchema),z.lazy(() => BasketUpdateManyWithWhereWithoutCourseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BasketScalarWhereInputSchema),z.lazy(() => BasketScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ScoreCardUncheckedUpdateManyWithoutCourseNestedInputSchema: z.ZodType<Prisma.ScoreCardUncheckedUpdateManyWithoutCourseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCardCreateWithoutCourseInputSchema),z.lazy(() => ScoreCardCreateWithoutCourseInputSchema).array(),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseInputSchema),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScoreCardCreateOrConnectWithoutCourseInputSchema),z.lazy(() => ScoreCardCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScoreCardUpsertWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => ScoreCardUpsertWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScoreCardCreateManyCourseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScoreCardWhereUniqueInputSchema),z.lazy(() => ScoreCardWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScoreCardWhereUniqueInputSchema),z.lazy(() => ScoreCardWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScoreCardWhereUniqueInputSchema),z.lazy(() => ScoreCardWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScoreCardWhereUniqueInputSchema),z.lazy(() => ScoreCardWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScoreCardUpdateWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => ScoreCardUpdateWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScoreCardUpdateManyWithWhereWithoutCourseInputSchema),z.lazy(() => ScoreCardUpdateManyWithWhereWithoutCourseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScoreCardScalarWhereInputSchema),z.lazy(() => ScoreCardScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ScoreCreateNestedManyWithoutBasketInputSchema: z.ZodType<Prisma.ScoreCreateNestedManyWithoutBasketInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCreateWithoutBasketInputSchema),z.lazy(() => ScoreCreateWithoutBasketInputSchema).array(),z.lazy(() => ScoreUncheckedCreateWithoutBasketInputSchema),z.lazy(() => ScoreUncheckedCreateWithoutBasketInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScoreCreateOrConnectWithoutBasketInputSchema),z.lazy(() => ScoreCreateOrConnectWithoutBasketInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScoreCreateManyBasketInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CourseCreateNestedOneWithoutBasketsInputSchema: z.ZodType<Prisma.CourseCreateNestedOneWithoutBasketsInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutBasketsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutBasketsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CourseCreateOrConnectWithoutBasketsInputSchema).optional(),
  connect: z.lazy(() => CourseWhereUniqueInputSchema).optional()
}).strict();

export const ScoreUncheckedCreateNestedManyWithoutBasketInputSchema: z.ZodType<Prisma.ScoreUncheckedCreateNestedManyWithoutBasketInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCreateWithoutBasketInputSchema),z.lazy(() => ScoreCreateWithoutBasketInputSchema).array(),z.lazy(() => ScoreUncheckedCreateWithoutBasketInputSchema),z.lazy(() => ScoreUncheckedCreateWithoutBasketInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScoreCreateOrConnectWithoutBasketInputSchema),z.lazy(() => ScoreCreateOrConnectWithoutBasketInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScoreCreateManyBasketInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ScoreUpdateManyWithoutBasketNestedInputSchema: z.ZodType<Prisma.ScoreUpdateManyWithoutBasketNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCreateWithoutBasketInputSchema),z.lazy(() => ScoreCreateWithoutBasketInputSchema).array(),z.lazy(() => ScoreUncheckedCreateWithoutBasketInputSchema),z.lazy(() => ScoreUncheckedCreateWithoutBasketInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScoreCreateOrConnectWithoutBasketInputSchema),z.lazy(() => ScoreCreateOrConnectWithoutBasketInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScoreUpsertWithWhereUniqueWithoutBasketInputSchema),z.lazy(() => ScoreUpsertWithWhereUniqueWithoutBasketInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScoreCreateManyBasketInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScoreUpdateWithWhereUniqueWithoutBasketInputSchema),z.lazy(() => ScoreUpdateWithWhereUniqueWithoutBasketInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScoreUpdateManyWithWhereWithoutBasketInputSchema),z.lazy(() => ScoreUpdateManyWithWhereWithoutBasketInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScoreScalarWhereInputSchema),z.lazy(() => ScoreScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CourseUpdateOneRequiredWithoutBasketsNestedInputSchema: z.ZodType<Prisma.CourseUpdateOneRequiredWithoutBasketsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutBasketsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutBasketsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CourseCreateOrConnectWithoutBasketsInputSchema).optional(),
  upsert: z.lazy(() => CourseUpsertWithoutBasketsInputSchema).optional(),
  connect: z.lazy(() => CourseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CourseUpdateToOneWithWhereWithoutBasketsInputSchema),z.lazy(() => CourseUpdateWithoutBasketsInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutBasketsInputSchema) ]).optional(),
}).strict();

export const ScoreUncheckedUpdateManyWithoutBasketNestedInputSchema: z.ZodType<Prisma.ScoreUncheckedUpdateManyWithoutBasketNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCreateWithoutBasketInputSchema),z.lazy(() => ScoreCreateWithoutBasketInputSchema).array(),z.lazy(() => ScoreUncheckedCreateWithoutBasketInputSchema),z.lazy(() => ScoreUncheckedCreateWithoutBasketInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScoreCreateOrConnectWithoutBasketInputSchema),z.lazy(() => ScoreCreateOrConnectWithoutBasketInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScoreUpsertWithWhereUniqueWithoutBasketInputSchema),z.lazy(() => ScoreUpsertWithWhereUniqueWithoutBasketInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScoreCreateManyBasketInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScoreUpdateWithWhereUniqueWithoutBasketInputSchema),z.lazy(() => ScoreUpdateWithWhereUniqueWithoutBasketInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScoreUpdateManyWithWhereWithoutBasketInputSchema),z.lazy(() => ScoreUpdateManyWithWhereWithoutBasketInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScoreScalarWhereInputSchema),z.lazy(() => ScoreScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CourseResultCreateNestedOneWithoutScoresInputSchema: z.ZodType<Prisma.CourseResultCreateNestedOneWithoutScoresInput> = z.object({
  create: z.union([ z.lazy(() => CourseResultCreateWithoutScoresInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutScoresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CourseResultCreateOrConnectWithoutScoresInputSchema).optional(),
  connect: z.lazy(() => CourseResultWhereUniqueInputSchema).optional()
}).strict();

export const BasketCreateNestedOneWithoutScoresInputSchema: z.ZodType<Prisma.BasketCreateNestedOneWithoutScoresInput> = z.object({
  create: z.union([ z.lazy(() => BasketCreateWithoutScoresInputSchema),z.lazy(() => BasketUncheckedCreateWithoutScoresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BasketCreateOrConnectWithoutScoresInputSchema).optional(),
  connect: z.lazy(() => BasketWhereUniqueInputSchema).optional()
}).strict();

export const CourseResultUpdateOneRequiredWithoutScoresNestedInputSchema: z.ZodType<Prisma.CourseResultUpdateOneRequiredWithoutScoresNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseResultCreateWithoutScoresInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutScoresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CourseResultCreateOrConnectWithoutScoresInputSchema).optional(),
  upsert: z.lazy(() => CourseResultUpsertWithoutScoresInputSchema).optional(),
  connect: z.lazy(() => CourseResultWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CourseResultUpdateToOneWithWhereWithoutScoresInputSchema),z.lazy(() => CourseResultUpdateWithoutScoresInputSchema),z.lazy(() => CourseResultUncheckedUpdateWithoutScoresInputSchema) ]).optional(),
}).strict();

export const BasketUpdateOneRequiredWithoutScoresNestedInputSchema: z.ZodType<Prisma.BasketUpdateOneRequiredWithoutScoresNestedInput> = z.object({
  create: z.union([ z.lazy(() => BasketCreateWithoutScoresInputSchema),z.lazy(() => BasketUncheckedCreateWithoutScoresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BasketCreateOrConnectWithoutScoresInputSchema).optional(),
  upsert: z.lazy(() => BasketUpsertWithoutScoresInputSchema).optional(),
  connect: z.lazy(() => BasketWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BasketUpdateToOneWithWhereWithoutScoresInputSchema),z.lazy(() => BasketUpdateWithoutScoresInputSchema),z.lazy(() => BasketUncheckedUpdateWithoutScoresInputSchema) ]).optional(),
}).strict();

export const ScoreCreateNestedManyWithoutCourseResultInputSchema: z.ZodType<Prisma.ScoreCreateNestedManyWithoutCourseResultInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCreateWithoutCourseResultInputSchema),z.lazy(() => ScoreCreateWithoutCourseResultInputSchema).array(),z.lazy(() => ScoreUncheckedCreateWithoutCourseResultInputSchema),z.lazy(() => ScoreUncheckedCreateWithoutCourseResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScoreCreateOrConnectWithoutCourseResultInputSchema),z.lazy(() => ScoreCreateOrConnectWithoutCourseResultInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScoreCreateManyCourseResultInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ScoreCardCreateNestedOneWithoutCourseResultsInputSchema: z.ZodType<Prisma.ScoreCardCreateNestedOneWithoutCourseResultsInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCardCreateWithoutCourseResultsInputSchema),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ScoreCardCreateOrConnectWithoutCourseResultsInputSchema).optional(),
  connect: z.lazy(() => ScoreCardWhereUniqueInputSchema).optional()
}).strict();

export const PlayerCreateNestedOneWithoutCourseResultsInputSchema: z.ZodType<Prisma.PlayerCreateNestedOneWithoutCourseResultsInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutCourseResultsInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutCourseResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlayerCreateOrConnectWithoutCourseResultsInputSchema).optional(),
  connect: z.lazy(() => PlayerWhereUniqueInputSchema).optional()
}).strict();

export const ScoreUncheckedCreateNestedManyWithoutCourseResultInputSchema: z.ZodType<Prisma.ScoreUncheckedCreateNestedManyWithoutCourseResultInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCreateWithoutCourseResultInputSchema),z.lazy(() => ScoreCreateWithoutCourseResultInputSchema).array(),z.lazy(() => ScoreUncheckedCreateWithoutCourseResultInputSchema),z.lazy(() => ScoreUncheckedCreateWithoutCourseResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScoreCreateOrConnectWithoutCourseResultInputSchema),z.lazy(() => ScoreCreateOrConnectWithoutCourseResultInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScoreCreateManyCourseResultInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ScoreUpdateManyWithoutCourseResultNestedInputSchema: z.ZodType<Prisma.ScoreUpdateManyWithoutCourseResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCreateWithoutCourseResultInputSchema),z.lazy(() => ScoreCreateWithoutCourseResultInputSchema).array(),z.lazy(() => ScoreUncheckedCreateWithoutCourseResultInputSchema),z.lazy(() => ScoreUncheckedCreateWithoutCourseResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScoreCreateOrConnectWithoutCourseResultInputSchema),z.lazy(() => ScoreCreateOrConnectWithoutCourseResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScoreUpsertWithWhereUniqueWithoutCourseResultInputSchema),z.lazy(() => ScoreUpsertWithWhereUniqueWithoutCourseResultInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScoreCreateManyCourseResultInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScoreUpdateWithWhereUniqueWithoutCourseResultInputSchema),z.lazy(() => ScoreUpdateWithWhereUniqueWithoutCourseResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScoreUpdateManyWithWhereWithoutCourseResultInputSchema),z.lazy(() => ScoreUpdateManyWithWhereWithoutCourseResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScoreScalarWhereInputSchema),z.lazy(() => ScoreScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ScoreCardUpdateOneRequiredWithoutCourseResultsNestedInputSchema: z.ZodType<Prisma.ScoreCardUpdateOneRequiredWithoutCourseResultsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCardCreateWithoutCourseResultsInputSchema),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ScoreCardCreateOrConnectWithoutCourseResultsInputSchema).optional(),
  upsert: z.lazy(() => ScoreCardUpsertWithoutCourseResultsInputSchema).optional(),
  connect: z.lazy(() => ScoreCardWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ScoreCardUpdateToOneWithWhereWithoutCourseResultsInputSchema),z.lazy(() => ScoreCardUpdateWithoutCourseResultsInputSchema),z.lazy(() => ScoreCardUncheckedUpdateWithoutCourseResultsInputSchema) ]).optional(),
}).strict();

export const PlayerUpdateOneRequiredWithoutCourseResultsNestedInputSchema: z.ZodType<Prisma.PlayerUpdateOneRequiredWithoutCourseResultsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutCourseResultsInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutCourseResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlayerCreateOrConnectWithoutCourseResultsInputSchema).optional(),
  upsert: z.lazy(() => PlayerUpsertWithoutCourseResultsInputSchema).optional(),
  connect: z.lazy(() => PlayerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlayerUpdateToOneWithWhereWithoutCourseResultsInputSchema),z.lazy(() => PlayerUpdateWithoutCourseResultsInputSchema),z.lazy(() => PlayerUncheckedUpdateWithoutCourseResultsInputSchema) ]).optional(),
}).strict();

export const ScoreUncheckedUpdateManyWithoutCourseResultNestedInputSchema: z.ZodType<Prisma.ScoreUncheckedUpdateManyWithoutCourseResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScoreCreateWithoutCourseResultInputSchema),z.lazy(() => ScoreCreateWithoutCourseResultInputSchema).array(),z.lazy(() => ScoreUncheckedCreateWithoutCourseResultInputSchema),z.lazy(() => ScoreUncheckedCreateWithoutCourseResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScoreCreateOrConnectWithoutCourseResultInputSchema),z.lazy(() => ScoreCreateOrConnectWithoutCourseResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScoreUpsertWithWhereUniqueWithoutCourseResultInputSchema),z.lazy(() => ScoreUpsertWithWhereUniqueWithoutCourseResultInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScoreCreateManyCourseResultInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScoreWhereUniqueInputSchema),z.lazy(() => ScoreWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScoreUpdateWithWhereUniqueWithoutCourseResultInputSchema),z.lazy(() => ScoreUpdateWithWhereUniqueWithoutCourseResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScoreUpdateManyWithWhereWithoutCourseResultInputSchema),z.lazy(() => ScoreUpdateManyWithWhereWithoutCourseResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScoreScalarWhereInputSchema),z.lazy(() => ScoreScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CourseResultCreateNestedManyWithoutPlayerInputSchema: z.ZodType<Prisma.CourseResultCreateNestedManyWithoutPlayerInput> = z.object({
  create: z.union([ z.lazy(() => CourseResultCreateWithoutPlayerInputSchema),z.lazy(() => CourseResultCreateWithoutPlayerInputSchema).array(),z.lazy(() => CourseResultUncheckedCreateWithoutPlayerInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutPlayerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseResultCreateOrConnectWithoutPlayerInputSchema),z.lazy(() => CourseResultCreateOrConnectWithoutPlayerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CourseResultCreateManyPlayerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPlayerInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPlayerInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPlayerInputSchema),z.lazy(() => UserUncheckedCreateWithoutPlayerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPlayerInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CourseResultUncheckedCreateNestedManyWithoutPlayerInputSchema: z.ZodType<Prisma.CourseResultUncheckedCreateNestedManyWithoutPlayerInput> = z.object({
  create: z.union([ z.lazy(() => CourseResultCreateWithoutPlayerInputSchema),z.lazy(() => CourseResultCreateWithoutPlayerInputSchema).array(),z.lazy(() => CourseResultUncheckedCreateWithoutPlayerInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutPlayerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseResultCreateOrConnectWithoutPlayerInputSchema),z.lazy(() => CourseResultCreateOrConnectWithoutPlayerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CourseResultCreateManyPlayerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CourseResultUpdateManyWithoutPlayerNestedInputSchema: z.ZodType<Prisma.CourseResultUpdateManyWithoutPlayerNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseResultCreateWithoutPlayerInputSchema),z.lazy(() => CourseResultCreateWithoutPlayerInputSchema).array(),z.lazy(() => CourseResultUncheckedCreateWithoutPlayerInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutPlayerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseResultCreateOrConnectWithoutPlayerInputSchema),z.lazy(() => CourseResultCreateOrConnectWithoutPlayerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CourseResultUpsertWithWhereUniqueWithoutPlayerInputSchema),z.lazy(() => CourseResultUpsertWithWhereUniqueWithoutPlayerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CourseResultCreateManyPlayerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CourseResultUpdateWithWhereUniqueWithoutPlayerInputSchema),z.lazy(() => CourseResultUpdateWithWhereUniqueWithoutPlayerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CourseResultUpdateManyWithWhereWithoutPlayerInputSchema),z.lazy(() => CourseResultUpdateManyWithWhereWithoutPlayerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CourseResultScalarWhereInputSchema),z.lazy(() => CourseResultScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPlayerNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPlayerNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPlayerInputSchema),z.lazy(() => UserUncheckedCreateWithoutPlayerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPlayerInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPlayerInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPlayerInputSchema),z.lazy(() => UserUpdateWithoutPlayerInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPlayerInputSchema) ]).optional(),
}).strict();

export const CourseResultUncheckedUpdateManyWithoutPlayerNestedInputSchema: z.ZodType<Prisma.CourseResultUncheckedUpdateManyWithoutPlayerNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseResultCreateWithoutPlayerInputSchema),z.lazy(() => CourseResultCreateWithoutPlayerInputSchema).array(),z.lazy(() => CourseResultUncheckedCreateWithoutPlayerInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutPlayerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseResultCreateOrConnectWithoutPlayerInputSchema),z.lazy(() => CourseResultCreateOrConnectWithoutPlayerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CourseResultUpsertWithWhereUniqueWithoutPlayerInputSchema),z.lazy(() => CourseResultUpsertWithWhereUniqueWithoutPlayerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CourseResultCreateManyPlayerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CourseResultWhereUniqueInputSchema),z.lazy(() => CourseResultWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CourseResultUpdateWithWhereUniqueWithoutPlayerInputSchema),z.lazy(() => CourseResultUpdateWithWhereUniqueWithoutPlayerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CourseResultUpdateManyWithWhereWithoutPlayerInputSchema),z.lazy(() => CourseResultUpdateManyWithWhereWithoutPlayerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CourseResultScalarWhereInputSchema),z.lazy(() => CourseResultScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PlayerCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PlayerCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutUserInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlayerCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => PlayerWhereUniqueInputSchema).optional()
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PlayerUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutUserInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlayerCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => PlayerWhereUniqueInputSchema).optional()
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PlayerUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.PlayerUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutUserInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlayerCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => PlayerUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PlayerWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PlayerWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PlayerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlayerUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => PlayerUpdateWithoutUserInputSchema),z.lazy(() => PlayerUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PlayerUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutUserInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlayerCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => PlayerUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PlayerWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PlayerWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PlayerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlayerUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => PlayerUpdateWithoutUserInputSchema),z.lazy(() => PlayerUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const CourseResultCreateWithoutScoreCardInputSchema: z.ZodType<Prisma.CourseResultCreateWithoutScoreCardInput> = z.object({
  scores: z.lazy(() => ScoreCreateNestedManyWithoutCourseResultInputSchema).optional(),
  player: z.lazy(() => PlayerCreateNestedOneWithoutCourseResultsInputSchema)
}).strict();

export const CourseResultUncheckedCreateWithoutScoreCardInputSchema: z.ZodType<Prisma.CourseResultUncheckedCreateWithoutScoreCardInput> = z.object({
  id: z.number().int().optional(),
  playerId: z.number().int(),
  scores: z.lazy(() => ScoreUncheckedCreateNestedManyWithoutCourseResultInputSchema).optional()
}).strict();

export const CourseResultCreateOrConnectWithoutScoreCardInputSchema: z.ZodType<Prisma.CourseResultCreateOrConnectWithoutScoreCardInput> = z.object({
  where: z.lazy(() => CourseResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CourseResultCreateWithoutScoreCardInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutScoreCardInputSchema) ]),
}).strict();

export const CourseResultCreateManyScoreCardInputEnvelopeSchema: z.ZodType<Prisma.CourseResultCreateManyScoreCardInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CourseResultCreateManyScoreCardInputSchema),z.lazy(() => CourseResultCreateManyScoreCardInputSchema).array() ]),
}).strict();

export const CourseCreateWithoutScoreCardsInputSchema: z.ZodType<Prisma.CourseCreateWithoutScoreCardsInput> = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  layout: z.string(),
  baskets: z.lazy(() => BasketCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseUncheckedCreateWithoutScoreCardsInputSchema: z.ZodType<Prisma.CourseUncheckedCreateWithoutScoreCardsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  layout: z.string(),
  baskets: z.lazy(() => BasketUncheckedCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseCreateOrConnectWithoutScoreCardsInputSchema: z.ZodType<Prisma.CourseCreateOrConnectWithoutScoreCardsInput> = z.object({
  where: z.lazy(() => CourseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CourseCreateWithoutScoreCardsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutScoreCardsInputSchema) ]),
}).strict();

export const CourseResultUpsertWithWhereUniqueWithoutScoreCardInputSchema: z.ZodType<Prisma.CourseResultUpsertWithWhereUniqueWithoutScoreCardInput> = z.object({
  where: z.lazy(() => CourseResultWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CourseResultUpdateWithoutScoreCardInputSchema),z.lazy(() => CourseResultUncheckedUpdateWithoutScoreCardInputSchema) ]),
  create: z.union([ z.lazy(() => CourseResultCreateWithoutScoreCardInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutScoreCardInputSchema) ]),
}).strict();

export const CourseResultUpdateWithWhereUniqueWithoutScoreCardInputSchema: z.ZodType<Prisma.CourseResultUpdateWithWhereUniqueWithoutScoreCardInput> = z.object({
  where: z.lazy(() => CourseResultWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CourseResultUpdateWithoutScoreCardInputSchema),z.lazy(() => CourseResultUncheckedUpdateWithoutScoreCardInputSchema) ]),
}).strict();

export const CourseResultUpdateManyWithWhereWithoutScoreCardInputSchema: z.ZodType<Prisma.CourseResultUpdateManyWithWhereWithoutScoreCardInput> = z.object({
  where: z.lazy(() => CourseResultScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CourseResultUpdateManyMutationInputSchema),z.lazy(() => CourseResultUncheckedUpdateManyWithoutScoreCardInputSchema) ]),
}).strict();

export const CourseResultScalarWhereInputSchema: z.ZodType<Prisma.CourseResultScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CourseResultScalarWhereInputSchema),z.lazy(() => CourseResultScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseResultScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseResultScalarWhereInputSchema),z.lazy(() => CourseResultScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  scoreCardId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  playerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const CourseUpsertWithoutScoreCardsInputSchema: z.ZodType<Prisma.CourseUpsertWithoutScoreCardsInput> = z.object({
  update: z.union([ z.lazy(() => CourseUpdateWithoutScoreCardsInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutScoreCardsInputSchema) ]),
  create: z.union([ z.lazy(() => CourseCreateWithoutScoreCardsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutScoreCardsInputSchema) ]),
  where: z.lazy(() => CourseWhereInputSchema).optional()
}).strict();

export const CourseUpdateToOneWithWhereWithoutScoreCardsInputSchema: z.ZodType<Prisma.CourseUpdateToOneWithWhereWithoutScoreCardsInput> = z.object({
  where: z.lazy(() => CourseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CourseUpdateWithoutScoreCardsInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutScoreCardsInputSchema) ]),
}).strict();

export const CourseUpdateWithoutScoreCardsInputSchema: z.ZodType<Prisma.CourseUpdateWithoutScoreCardsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  layout: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baskets: z.lazy(() => BasketUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseUncheckedUpdateWithoutScoreCardsInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateWithoutScoreCardsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  layout: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baskets: z.lazy(() => BasketUncheckedUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const BasketCreateWithoutCourseInputSchema: z.ZodType<Prisma.BasketCreateWithoutCourseInput> = z.object({
  par: z.number().int(),
  length: z.number(),
  order: z.number().int(),
  scores: z.lazy(() => ScoreCreateNestedManyWithoutBasketInputSchema).optional()
}).strict();

export const BasketUncheckedCreateWithoutCourseInputSchema: z.ZodType<Prisma.BasketUncheckedCreateWithoutCourseInput> = z.object({
  id: z.number().int().optional(),
  par: z.number().int(),
  length: z.number(),
  order: z.number().int(),
  scores: z.lazy(() => ScoreUncheckedCreateNestedManyWithoutBasketInputSchema).optional()
}).strict();

export const BasketCreateOrConnectWithoutCourseInputSchema: z.ZodType<Prisma.BasketCreateOrConnectWithoutCourseInput> = z.object({
  where: z.lazy(() => BasketWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BasketCreateWithoutCourseInputSchema),z.lazy(() => BasketUncheckedCreateWithoutCourseInputSchema) ]),
}).strict();

export const BasketCreateManyCourseInputEnvelopeSchema: z.ZodType<Prisma.BasketCreateManyCourseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BasketCreateManyCourseInputSchema),z.lazy(() => BasketCreateManyCourseInputSchema).array() ]),
}).strict();

export const ScoreCardCreateWithoutCourseInputSchema: z.ZodType<Prisma.ScoreCardCreateWithoutCourseInput> = z.object({
  date: z.coerce.date(),
  courseResults: z.lazy(() => CourseResultCreateNestedManyWithoutScoreCardInputSchema).optional()
}).strict();

export const ScoreCardUncheckedCreateWithoutCourseInputSchema: z.ZodType<Prisma.ScoreCardUncheckedCreateWithoutCourseInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  courseResults: z.lazy(() => CourseResultUncheckedCreateNestedManyWithoutScoreCardInputSchema).optional()
}).strict();

export const ScoreCardCreateOrConnectWithoutCourseInputSchema: z.ZodType<Prisma.ScoreCardCreateOrConnectWithoutCourseInput> = z.object({
  where: z.lazy(() => ScoreCardWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ScoreCardCreateWithoutCourseInputSchema),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseInputSchema) ]),
}).strict();

export const ScoreCardCreateManyCourseInputEnvelopeSchema: z.ZodType<Prisma.ScoreCardCreateManyCourseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ScoreCardCreateManyCourseInputSchema),z.lazy(() => ScoreCardCreateManyCourseInputSchema).array() ]),
}).strict();

export const BasketUpsertWithWhereUniqueWithoutCourseInputSchema: z.ZodType<Prisma.BasketUpsertWithWhereUniqueWithoutCourseInput> = z.object({
  where: z.lazy(() => BasketWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BasketUpdateWithoutCourseInputSchema),z.lazy(() => BasketUncheckedUpdateWithoutCourseInputSchema) ]),
  create: z.union([ z.lazy(() => BasketCreateWithoutCourseInputSchema),z.lazy(() => BasketUncheckedCreateWithoutCourseInputSchema) ]),
}).strict();

export const BasketUpdateWithWhereUniqueWithoutCourseInputSchema: z.ZodType<Prisma.BasketUpdateWithWhereUniqueWithoutCourseInput> = z.object({
  where: z.lazy(() => BasketWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BasketUpdateWithoutCourseInputSchema),z.lazy(() => BasketUncheckedUpdateWithoutCourseInputSchema) ]),
}).strict();

export const BasketUpdateManyWithWhereWithoutCourseInputSchema: z.ZodType<Prisma.BasketUpdateManyWithWhereWithoutCourseInput> = z.object({
  where: z.lazy(() => BasketScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BasketUpdateManyMutationInputSchema),z.lazy(() => BasketUncheckedUpdateManyWithoutCourseInputSchema) ]),
}).strict();

export const BasketScalarWhereInputSchema: z.ZodType<Prisma.BasketScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BasketScalarWhereInputSchema),z.lazy(() => BasketScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BasketScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BasketScalarWhereInputSchema),z.lazy(() => BasketScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  par: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  length: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  courseId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ScoreCardUpsertWithWhereUniqueWithoutCourseInputSchema: z.ZodType<Prisma.ScoreCardUpsertWithWhereUniqueWithoutCourseInput> = z.object({
  where: z.lazy(() => ScoreCardWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ScoreCardUpdateWithoutCourseInputSchema),z.lazy(() => ScoreCardUncheckedUpdateWithoutCourseInputSchema) ]),
  create: z.union([ z.lazy(() => ScoreCardCreateWithoutCourseInputSchema),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseInputSchema) ]),
}).strict();

export const ScoreCardUpdateWithWhereUniqueWithoutCourseInputSchema: z.ZodType<Prisma.ScoreCardUpdateWithWhereUniqueWithoutCourseInput> = z.object({
  where: z.lazy(() => ScoreCardWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ScoreCardUpdateWithoutCourseInputSchema),z.lazy(() => ScoreCardUncheckedUpdateWithoutCourseInputSchema) ]),
}).strict();

export const ScoreCardUpdateManyWithWhereWithoutCourseInputSchema: z.ZodType<Prisma.ScoreCardUpdateManyWithWhereWithoutCourseInput> = z.object({
  where: z.lazy(() => ScoreCardScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ScoreCardUpdateManyMutationInputSchema),z.lazy(() => ScoreCardUncheckedUpdateManyWithoutCourseInputSchema) ]),
}).strict();

export const ScoreCardScalarWhereInputSchema: z.ZodType<Prisma.ScoreCardScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ScoreCardScalarWhereInputSchema),z.lazy(() => ScoreCardScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScoreCardScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScoreCardScalarWhereInputSchema),z.lazy(() => ScoreCardScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  courseId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ScoreCreateWithoutBasketInputSchema: z.ZodType<Prisma.ScoreCreateWithoutBasketInput> = z.object({
  count: z.number().int(),
  courseResult: z.lazy(() => CourseResultCreateNestedOneWithoutScoresInputSchema)
}).strict();

export const ScoreUncheckedCreateWithoutBasketInputSchema: z.ZodType<Prisma.ScoreUncheckedCreateWithoutBasketInput> = z.object({
  id: z.number().int().optional(),
  count: z.number().int(),
  courseResultId: z.number().int()
}).strict();

export const ScoreCreateOrConnectWithoutBasketInputSchema: z.ZodType<Prisma.ScoreCreateOrConnectWithoutBasketInput> = z.object({
  where: z.lazy(() => ScoreWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ScoreCreateWithoutBasketInputSchema),z.lazy(() => ScoreUncheckedCreateWithoutBasketInputSchema) ]),
}).strict();

export const ScoreCreateManyBasketInputEnvelopeSchema: z.ZodType<Prisma.ScoreCreateManyBasketInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ScoreCreateManyBasketInputSchema),z.lazy(() => ScoreCreateManyBasketInputSchema).array() ]),
}).strict();

export const CourseCreateWithoutBasketsInputSchema: z.ZodType<Prisma.CourseCreateWithoutBasketsInput> = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  layout: z.string(),
  scoreCards: z.lazy(() => ScoreCardCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseUncheckedCreateWithoutBasketsInputSchema: z.ZodType<Prisma.CourseUncheckedCreateWithoutBasketsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  layout: z.string(),
  scoreCards: z.lazy(() => ScoreCardUncheckedCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseCreateOrConnectWithoutBasketsInputSchema: z.ZodType<Prisma.CourseCreateOrConnectWithoutBasketsInput> = z.object({
  where: z.lazy(() => CourseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CourseCreateWithoutBasketsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutBasketsInputSchema) ]),
}).strict();

export const ScoreUpsertWithWhereUniqueWithoutBasketInputSchema: z.ZodType<Prisma.ScoreUpsertWithWhereUniqueWithoutBasketInput> = z.object({
  where: z.lazy(() => ScoreWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ScoreUpdateWithoutBasketInputSchema),z.lazy(() => ScoreUncheckedUpdateWithoutBasketInputSchema) ]),
  create: z.union([ z.lazy(() => ScoreCreateWithoutBasketInputSchema),z.lazy(() => ScoreUncheckedCreateWithoutBasketInputSchema) ]),
}).strict();

export const ScoreUpdateWithWhereUniqueWithoutBasketInputSchema: z.ZodType<Prisma.ScoreUpdateWithWhereUniqueWithoutBasketInput> = z.object({
  where: z.lazy(() => ScoreWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ScoreUpdateWithoutBasketInputSchema),z.lazy(() => ScoreUncheckedUpdateWithoutBasketInputSchema) ]),
}).strict();

export const ScoreUpdateManyWithWhereWithoutBasketInputSchema: z.ZodType<Prisma.ScoreUpdateManyWithWhereWithoutBasketInput> = z.object({
  where: z.lazy(() => ScoreScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ScoreUpdateManyMutationInputSchema),z.lazy(() => ScoreUncheckedUpdateManyWithoutBasketInputSchema) ]),
}).strict();

export const ScoreScalarWhereInputSchema: z.ZodType<Prisma.ScoreScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ScoreScalarWhereInputSchema),z.lazy(() => ScoreScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScoreScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScoreScalarWhereInputSchema),z.lazy(() => ScoreScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  count: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  courseResultId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  basketId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const CourseUpsertWithoutBasketsInputSchema: z.ZodType<Prisma.CourseUpsertWithoutBasketsInput> = z.object({
  update: z.union([ z.lazy(() => CourseUpdateWithoutBasketsInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutBasketsInputSchema) ]),
  create: z.union([ z.lazy(() => CourseCreateWithoutBasketsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutBasketsInputSchema) ]),
  where: z.lazy(() => CourseWhereInputSchema).optional()
}).strict();

export const CourseUpdateToOneWithWhereWithoutBasketsInputSchema: z.ZodType<Prisma.CourseUpdateToOneWithWhereWithoutBasketsInput> = z.object({
  where: z.lazy(() => CourseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CourseUpdateWithoutBasketsInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutBasketsInputSchema) ]),
}).strict();

export const CourseUpdateWithoutBasketsInputSchema: z.ZodType<Prisma.CourseUpdateWithoutBasketsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  layout: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scoreCards: z.lazy(() => ScoreCardUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseUncheckedUpdateWithoutBasketsInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateWithoutBasketsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  layout: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scoreCards: z.lazy(() => ScoreCardUncheckedUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseResultCreateWithoutScoresInputSchema: z.ZodType<Prisma.CourseResultCreateWithoutScoresInput> = z.object({
  scoreCard: z.lazy(() => ScoreCardCreateNestedOneWithoutCourseResultsInputSchema),
  player: z.lazy(() => PlayerCreateNestedOneWithoutCourseResultsInputSchema)
}).strict();

export const CourseResultUncheckedCreateWithoutScoresInputSchema: z.ZodType<Prisma.CourseResultUncheckedCreateWithoutScoresInput> = z.object({
  id: z.number().int().optional(),
  scoreCardId: z.number().int(),
  playerId: z.number().int()
}).strict();

export const CourseResultCreateOrConnectWithoutScoresInputSchema: z.ZodType<Prisma.CourseResultCreateOrConnectWithoutScoresInput> = z.object({
  where: z.lazy(() => CourseResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CourseResultCreateWithoutScoresInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutScoresInputSchema) ]),
}).strict();

export const BasketCreateWithoutScoresInputSchema: z.ZodType<Prisma.BasketCreateWithoutScoresInput> = z.object({
  par: z.number().int(),
  length: z.number(),
  order: z.number().int(),
  course: z.lazy(() => CourseCreateNestedOneWithoutBasketsInputSchema)
}).strict();

export const BasketUncheckedCreateWithoutScoresInputSchema: z.ZodType<Prisma.BasketUncheckedCreateWithoutScoresInput> = z.object({
  id: z.number().int().optional(),
  par: z.number().int(),
  length: z.number(),
  order: z.number().int(),
  courseId: z.number().int()
}).strict();

export const BasketCreateOrConnectWithoutScoresInputSchema: z.ZodType<Prisma.BasketCreateOrConnectWithoutScoresInput> = z.object({
  where: z.lazy(() => BasketWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BasketCreateWithoutScoresInputSchema),z.lazy(() => BasketUncheckedCreateWithoutScoresInputSchema) ]),
}).strict();

export const CourseResultUpsertWithoutScoresInputSchema: z.ZodType<Prisma.CourseResultUpsertWithoutScoresInput> = z.object({
  update: z.union([ z.lazy(() => CourseResultUpdateWithoutScoresInputSchema),z.lazy(() => CourseResultUncheckedUpdateWithoutScoresInputSchema) ]),
  create: z.union([ z.lazy(() => CourseResultCreateWithoutScoresInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutScoresInputSchema) ]),
  where: z.lazy(() => CourseResultWhereInputSchema).optional()
}).strict();

export const CourseResultUpdateToOneWithWhereWithoutScoresInputSchema: z.ZodType<Prisma.CourseResultUpdateToOneWithWhereWithoutScoresInput> = z.object({
  where: z.lazy(() => CourseResultWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CourseResultUpdateWithoutScoresInputSchema),z.lazy(() => CourseResultUncheckedUpdateWithoutScoresInputSchema) ]),
}).strict();

export const CourseResultUpdateWithoutScoresInputSchema: z.ZodType<Prisma.CourseResultUpdateWithoutScoresInput> = z.object({
  scoreCard: z.lazy(() => ScoreCardUpdateOneRequiredWithoutCourseResultsNestedInputSchema).optional(),
  player: z.lazy(() => PlayerUpdateOneRequiredWithoutCourseResultsNestedInputSchema).optional()
}).strict();

export const CourseResultUncheckedUpdateWithoutScoresInputSchema: z.ZodType<Prisma.CourseResultUncheckedUpdateWithoutScoresInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scoreCardId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BasketUpsertWithoutScoresInputSchema: z.ZodType<Prisma.BasketUpsertWithoutScoresInput> = z.object({
  update: z.union([ z.lazy(() => BasketUpdateWithoutScoresInputSchema),z.lazy(() => BasketUncheckedUpdateWithoutScoresInputSchema) ]),
  create: z.union([ z.lazy(() => BasketCreateWithoutScoresInputSchema),z.lazy(() => BasketUncheckedCreateWithoutScoresInputSchema) ]),
  where: z.lazy(() => BasketWhereInputSchema).optional()
}).strict();

export const BasketUpdateToOneWithWhereWithoutScoresInputSchema: z.ZodType<Prisma.BasketUpdateToOneWithWhereWithoutScoresInput> = z.object({
  where: z.lazy(() => BasketWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BasketUpdateWithoutScoresInputSchema),z.lazy(() => BasketUncheckedUpdateWithoutScoresInputSchema) ]),
}).strict();

export const BasketUpdateWithoutScoresInputSchema: z.ZodType<Prisma.BasketUpdateWithoutScoresInput> = z.object({
  par: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  course: z.lazy(() => CourseUpdateOneRequiredWithoutBasketsNestedInputSchema).optional()
}).strict();

export const BasketUncheckedUpdateWithoutScoresInputSchema: z.ZodType<Prisma.BasketUncheckedUpdateWithoutScoresInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  par: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreCreateWithoutCourseResultInputSchema: z.ZodType<Prisma.ScoreCreateWithoutCourseResultInput> = z.object({
  count: z.number().int(),
  basket: z.lazy(() => BasketCreateNestedOneWithoutScoresInputSchema)
}).strict();

export const ScoreUncheckedCreateWithoutCourseResultInputSchema: z.ZodType<Prisma.ScoreUncheckedCreateWithoutCourseResultInput> = z.object({
  id: z.number().int().optional(),
  count: z.number().int(),
  basketId: z.number().int()
}).strict();

export const ScoreCreateOrConnectWithoutCourseResultInputSchema: z.ZodType<Prisma.ScoreCreateOrConnectWithoutCourseResultInput> = z.object({
  where: z.lazy(() => ScoreWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ScoreCreateWithoutCourseResultInputSchema),z.lazy(() => ScoreUncheckedCreateWithoutCourseResultInputSchema) ]),
}).strict();

export const ScoreCreateManyCourseResultInputEnvelopeSchema: z.ZodType<Prisma.ScoreCreateManyCourseResultInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ScoreCreateManyCourseResultInputSchema),z.lazy(() => ScoreCreateManyCourseResultInputSchema).array() ]),
}).strict();

export const ScoreCardCreateWithoutCourseResultsInputSchema: z.ZodType<Prisma.ScoreCardCreateWithoutCourseResultsInput> = z.object({
  date: z.coerce.date(),
  course: z.lazy(() => CourseCreateNestedOneWithoutScoreCardsInputSchema)
}).strict();

export const ScoreCardUncheckedCreateWithoutCourseResultsInputSchema: z.ZodType<Prisma.ScoreCardUncheckedCreateWithoutCourseResultsInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  courseId: z.number().int()
}).strict();

export const ScoreCardCreateOrConnectWithoutCourseResultsInputSchema: z.ZodType<Prisma.ScoreCardCreateOrConnectWithoutCourseResultsInput> = z.object({
  where: z.lazy(() => ScoreCardWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ScoreCardCreateWithoutCourseResultsInputSchema),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseResultsInputSchema) ]),
}).strict();

export const PlayerCreateWithoutCourseResultsInputSchema: z.ZodType<Prisma.PlayerCreateWithoutCourseResultsInput> = z.object({
  name: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutPlayerInputSchema)
}).strict();

export const PlayerUncheckedCreateWithoutCourseResultsInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateWithoutCourseResultsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  userId: z.number().int()
}).strict();

export const PlayerCreateOrConnectWithoutCourseResultsInputSchema: z.ZodType<Prisma.PlayerCreateOrConnectWithoutCourseResultsInput> = z.object({
  where: z.lazy(() => PlayerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlayerCreateWithoutCourseResultsInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutCourseResultsInputSchema) ]),
}).strict();

export const ScoreUpsertWithWhereUniqueWithoutCourseResultInputSchema: z.ZodType<Prisma.ScoreUpsertWithWhereUniqueWithoutCourseResultInput> = z.object({
  where: z.lazy(() => ScoreWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ScoreUpdateWithoutCourseResultInputSchema),z.lazy(() => ScoreUncheckedUpdateWithoutCourseResultInputSchema) ]),
  create: z.union([ z.lazy(() => ScoreCreateWithoutCourseResultInputSchema),z.lazy(() => ScoreUncheckedCreateWithoutCourseResultInputSchema) ]),
}).strict();

export const ScoreUpdateWithWhereUniqueWithoutCourseResultInputSchema: z.ZodType<Prisma.ScoreUpdateWithWhereUniqueWithoutCourseResultInput> = z.object({
  where: z.lazy(() => ScoreWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ScoreUpdateWithoutCourseResultInputSchema),z.lazy(() => ScoreUncheckedUpdateWithoutCourseResultInputSchema) ]),
}).strict();

export const ScoreUpdateManyWithWhereWithoutCourseResultInputSchema: z.ZodType<Prisma.ScoreUpdateManyWithWhereWithoutCourseResultInput> = z.object({
  where: z.lazy(() => ScoreScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ScoreUpdateManyMutationInputSchema),z.lazy(() => ScoreUncheckedUpdateManyWithoutCourseResultInputSchema) ]),
}).strict();

export const ScoreCardUpsertWithoutCourseResultsInputSchema: z.ZodType<Prisma.ScoreCardUpsertWithoutCourseResultsInput> = z.object({
  update: z.union([ z.lazy(() => ScoreCardUpdateWithoutCourseResultsInputSchema),z.lazy(() => ScoreCardUncheckedUpdateWithoutCourseResultsInputSchema) ]),
  create: z.union([ z.lazy(() => ScoreCardCreateWithoutCourseResultsInputSchema),z.lazy(() => ScoreCardUncheckedCreateWithoutCourseResultsInputSchema) ]),
  where: z.lazy(() => ScoreCardWhereInputSchema).optional()
}).strict();

export const ScoreCardUpdateToOneWithWhereWithoutCourseResultsInputSchema: z.ZodType<Prisma.ScoreCardUpdateToOneWithWhereWithoutCourseResultsInput> = z.object({
  where: z.lazy(() => ScoreCardWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ScoreCardUpdateWithoutCourseResultsInputSchema),z.lazy(() => ScoreCardUncheckedUpdateWithoutCourseResultsInputSchema) ]),
}).strict();

export const ScoreCardUpdateWithoutCourseResultsInputSchema: z.ZodType<Prisma.ScoreCardUpdateWithoutCourseResultsInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  course: z.lazy(() => CourseUpdateOneRequiredWithoutScoreCardsNestedInputSchema).optional()
}).strict();

export const ScoreCardUncheckedUpdateWithoutCourseResultsInputSchema: z.ZodType<Prisma.ScoreCardUncheckedUpdateWithoutCourseResultsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerUpsertWithoutCourseResultsInputSchema: z.ZodType<Prisma.PlayerUpsertWithoutCourseResultsInput> = z.object({
  update: z.union([ z.lazy(() => PlayerUpdateWithoutCourseResultsInputSchema),z.lazy(() => PlayerUncheckedUpdateWithoutCourseResultsInputSchema) ]),
  create: z.union([ z.lazy(() => PlayerCreateWithoutCourseResultsInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutCourseResultsInputSchema) ]),
  where: z.lazy(() => PlayerWhereInputSchema).optional()
}).strict();

export const PlayerUpdateToOneWithWhereWithoutCourseResultsInputSchema: z.ZodType<Prisma.PlayerUpdateToOneWithWhereWithoutCourseResultsInput> = z.object({
  where: z.lazy(() => PlayerWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlayerUpdateWithoutCourseResultsInputSchema),z.lazy(() => PlayerUncheckedUpdateWithoutCourseResultsInputSchema) ]),
}).strict();

export const PlayerUpdateWithoutCourseResultsInputSchema: z.ZodType<Prisma.PlayerUpdateWithoutCourseResultsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPlayerNestedInputSchema).optional()
}).strict();

export const PlayerUncheckedUpdateWithoutCourseResultsInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateWithoutCourseResultsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CourseResultCreateWithoutPlayerInputSchema: z.ZodType<Prisma.CourseResultCreateWithoutPlayerInput> = z.object({
  scores: z.lazy(() => ScoreCreateNestedManyWithoutCourseResultInputSchema).optional(),
  scoreCard: z.lazy(() => ScoreCardCreateNestedOneWithoutCourseResultsInputSchema)
}).strict();

export const CourseResultUncheckedCreateWithoutPlayerInputSchema: z.ZodType<Prisma.CourseResultUncheckedCreateWithoutPlayerInput> = z.object({
  id: z.number().int().optional(),
  scoreCardId: z.number().int(),
  scores: z.lazy(() => ScoreUncheckedCreateNestedManyWithoutCourseResultInputSchema).optional()
}).strict();

export const CourseResultCreateOrConnectWithoutPlayerInputSchema: z.ZodType<Prisma.CourseResultCreateOrConnectWithoutPlayerInput> = z.object({
  where: z.lazy(() => CourseResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CourseResultCreateWithoutPlayerInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutPlayerInputSchema) ]),
}).strict();

export const CourseResultCreateManyPlayerInputEnvelopeSchema: z.ZodType<Prisma.CourseResultCreateManyPlayerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CourseResultCreateManyPlayerInputSchema),z.lazy(() => CourseResultCreateManyPlayerInputSchema).array() ]),
}).strict();

export const UserCreateWithoutPlayerInputSchema: z.ZodType<Prisma.UserCreateWithoutPlayerInput> = z.object({
  username: z.string(),
  hashedPassword: z.string(),
  playerId: z.number().int(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPlayerInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPlayerInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  hashedPassword: z.string(),
  playerId: z.number().int(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPlayerInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPlayerInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPlayerInputSchema),z.lazy(() => UserUncheckedCreateWithoutPlayerInputSchema) ]),
}).strict();

export const CourseResultUpsertWithWhereUniqueWithoutPlayerInputSchema: z.ZodType<Prisma.CourseResultUpsertWithWhereUniqueWithoutPlayerInput> = z.object({
  where: z.lazy(() => CourseResultWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CourseResultUpdateWithoutPlayerInputSchema),z.lazy(() => CourseResultUncheckedUpdateWithoutPlayerInputSchema) ]),
  create: z.union([ z.lazy(() => CourseResultCreateWithoutPlayerInputSchema),z.lazy(() => CourseResultUncheckedCreateWithoutPlayerInputSchema) ]),
}).strict();

export const CourseResultUpdateWithWhereUniqueWithoutPlayerInputSchema: z.ZodType<Prisma.CourseResultUpdateWithWhereUniqueWithoutPlayerInput> = z.object({
  where: z.lazy(() => CourseResultWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CourseResultUpdateWithoutPlayerInputSchema),z.lazy(() => CourseResultUncheckedUpdateWithoutPlayerInputSchema) ]),
}).strict();

export const CourseResultUpdateManyWithWhereWithoutPlayerInputSchema: z.ZodType<Prisma.CourseResultUpdateManyWithWhereWithoutPlayerInput> = z.object({
  where: z.lazy(() => CourseResultScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CourseResultUpdateManyMutationInputSchema),z.lazy(() => CourseResultUncheckedUpdateManyWithoutPlayerInputSchema) ]),
}).strict();

export const UserUpsertWithoutPlayerInputSchema: z.ZodType<Prisma.UserUpsertWithoutPlayerInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPlayerInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPlayerInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPlayerInputSchema),z.lazy(() => UserUncheckedCreateWithoutPlayerInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPlayerInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPlayerInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPlayerInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPlayerInputSchema) ]),
}).strict();

export const UserUpdateWithoutPlayerInputSchema: z.ZodType<Prisma.UserUpdateWithoutPlayerInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPlayerInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPlayerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PlayerCreateWithoutUserInputSchema: z.ZodType<Prisma.PlayerCreateWithoutUserInput> = z.object({
  name: z.string(),
  courseResults: z.lazy(() => CourseResultCreateNestedManyWithoutPlayerInputSchema).optional()
}).strict();

export const PlayerUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  courseResults: z.lazy(() => CourseResultUncheckedCreateNestedManyWithoutPlayerInputSchema).optional()
}).strict();

export const PlayerCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PlayerCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PlayerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlayerCreateWithoutUserInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
}).strict();

export const PlayerUpsertWithoutUserInputSchema: z.ZodType<Prisma.PlayerUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => PlayerUpdateWithoutUserInputSchema),z.lazy(() => PlayerUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PlayerCreateWithoutUserInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => PlayerWhereInputSchema).optional()
}).strict();

export const PlayerUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PlayerUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PlayerWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlayerUpdateWithoutUserInputSchema),z.lazy(() => PlayerUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const PlayerUpdateWithoutUserInputSchema: z.ZodType<Prisma.PlayerUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  courseResults: z.lazy(() => CourseResultUpdateManyWithoutPlayerNestedInputSchema).optional()
}).strict();

export const PlayerUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  courseResults: z.lazy(() => CourseResultUncheckedUpdateManyWithoutPlayerNestedInputSchema).optional()
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  username: z.string(),
  hashedPassword: z.string(),
  playerId: z.number().int(),
  player: z.lazy(() => PlayerCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  hashedPassword: z.string(),
  playerId: z.number().int(),
  player: z.lazy(() => PlayerUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  player: z.lazy(() => PlayerUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  player: z.lazy(() => PlayerUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const CourseResultCreateManyScoreCardInputSchema: z.ZodType<Prisma.CourseResultCreateManyScoreCardInput> = z.object({
  id: z.number().int().optional(),
  playerId: z.number().int()
}).strict();

export const CourseResultUpdateWithoutScoreCardInputSchema: z.ZodType<Prisma.CourseResultUpdateWithoutScoreCardInput> = z.object({
  scores: z.lazy(() => ScoreUpdateManyWithoutCourseResultNestedInputSchema).optional(),
  player: z.lazy(() => PlayerUpdateOneRequiredWithoutCourseResultsNestedInputSchema).optional()
}).strict();

export const CourseResultUncheckedUpdateWithoutScoreCardInputSchema: z.ZodType<Prisma.CourseResultUncheckedUpdateWithoutScoreCardInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scores: z.lazy(() => ScoreUncheckedUpdateManyWithoutCourseResultNestedInputSchema).optional()
}).strict();

export const CourseResultUncheckedUpdateManyWithoutScoreCardInputSchema: z.ZodType<Prisma.CourseResultUncheckedUpdateManyWithoutScoreCardInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  playerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BasketCreateManyCourseInputSchema: z.ZodType<Prisma.BasketCreateManyCourseInput> = z.object({
  id: z.number().int().optional(),
  par: z.number().int(),
  length: z.number(),
  order: z.number().int()
}).strict();

export const ScoreCardCreateManyCourseInputSchema: z.ZodType<Prisma.ScoreCardCreateManyCourseInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date()
}).strict();

export const BasketUpdateWithoutCourseInputSchema: z.ZodType<Prisma.BasketUpdateWithoutCourseInput> = z.object({
  par: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scores: z.lazy(() => ScoreUpdateManyWithoutBasketNestedInputSchema).optional()
}).strict();

export const BasketUncheckedUpdateWithoutCourseInputSchema: z.ZodType<Prisma.BasketUncheckedUpdateWithoutCourseInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  par: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scores: z.lazy(() => ScoreUncheckedUpdateManyWithoutBasketNestedInputSchema).optional()
}).strict();

export const BasketUncheckedUpdateManyWithoutCourseInputSchema: z.ZodType<Prisma.BasketUncheckedUpdateManyWithoutCourseInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  par: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreCardUpdateWithoutCourseInputSchema: z.ZodType<Prisma.ScoreCardUpdateWithoutCourseInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  courseResults: z.lazy(() => CourseResultUpdateManyWithoutScoreCardNestedInputSchema).optional()
}).strict();

export const ScoreCardUncheckedUpdateWithoutCourseInputSchema: z.ZodType<Prisma.ScoreCardUncheckedUpdateWithoutCourseInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  courseResults: z.lazy(() => CourseResultUncheckedUpdateManyWithoutScoreCardNestedInputSchema).optional()
}).strict();

export const ScoreCardUncheckedUpdateManyWithoutCourseInputSchema: z.ZodType<Prisma.ScoreCardUncheckedUpdateManyWithoutCourseInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreCreateManyBasketInputSchema: z.ZodType<Prisma.ScoreCreateManyBasketInput> = z.object({
  id: z.number().int().optional(),
  count: z.number().int(),
  courseResultId: z.number().int()
}).strict();

export const ScoreUpdateWithoutBasketInputSchema: z.ZodType<Prisma.ScoreUpdateWithoutBasketInput> = z.object({
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  courseResult: z.lazy(() => CourseResultUpdateOneRequiredWithoutScoresNestedInputSchema).optional()
}).strict();

export const ScoreUncheckedUpdateWithoutBasketInputSchema: z.ZodType<Prisma.ScoreUncheckedUpdateWithoutBasketInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  courseResultId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreUncheckedUpdateManyWithoutBasketInputSchema: z.ZodType<Prisma.ScoreUncheckedUpdateManyWithoutBasketInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  courseResultId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreCreateManyCourseResultInputSchema: z.ZodType<Prisma.ScoreCreateManyCourseResultInput> = z.object({
  id: z.number().int().optional(),
  count: z.number().int(),
  basketId: z.number().int()
}).strict();

export const ScoreUpdateWithoutCourseResultInputSchema: z.ZodType<Prisma.ScoreUpdateWithoutCourseResultInput> = z.object({
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  basket: z.lazy(() => BasketUpdateOneRequiredWithoutScoresNestedInputSchema).optional()
}).strict();

export const ScoreUncheckedUpdateWithoutCourseResultInputSchema: z.ZodType<Prisma.ScoreUncheckedUpdateWithoutCourseResultInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  basketId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreUncheckedUpdateManyWithoutCourseResultInputSchema: z.ZodType<Prisma.ScoreUncheckedUpdateManyWithoutCourseResultInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  basketId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CourseResultCreateManyPlayerInputSchema: z.ZodType<Prisma.CourseResultCreateManyPlayerInput> = z.object({
  id: z.number().int().optional(),
  scoreCardId: z.number().int()
}).strict();

export const CourseResultUpdateWithoutPlayerInputSchema: z.ZodType<Prisma.CourseResultUpdateWithoutPlayerInput> = z.object({
  scores: z.lazy(() => ScoreUpdateManyWithoutCourseResultNestedInputSchema).optional(),
  scoreCard: z.lazy(() => ScoreCardUpdateOneRequiredWithoutCourseResultsNestedInputSchema).optional()
}).strict();

export const CourseResultUncheckedUpdateWithoutPlayerInputSchema: z.ZodType<Prisma.CourseResultUncheckedUpdateWithoutPlayerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scoreCardId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scores: z.lazy(() => ScoreUncheckedUpdateManyWithoutCourseResultNestedInputSchema).optional()
}).strict();

export const CourseResultUncheckedUpdateManyWithoutPlayerInputSchema: z.ZodType<Prisma.CourseResultUncheckedUpdateManyWithoutPlayerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  scoreCardId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ScoreCardFindFirstArgsSchema: z.ZodType<Prisma.ScoreCardFindFirstArgs> = z.object({
  select: ScoreCardSelectSchema.optional(),
  include: ScoreCardIncludeSchema.optional(),
  where: ScoreCardWhereInputSchema.optional(),
  orderBy: z.union([ ScoreCardOrderByWithRelationInputSchema.array(),ScoreCardOrderByWithRelationInputSchema ]).optional(),
  cursor: ScoreCardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScoreCardScalarFieldEnumSchema,ScoreCardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScoreCardFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ScoreCardFindFirstOrThrowArgs> = z.object({
  select: ScoreCardSelectSchema.optional(),
  include: ScoreCardIncludeSchema.optional(),
  where: ScoreCardWhereInputSchema.optional(),
  orderBy: z.union([ ScoreCardOrderByWithRelationInputSchema.array(),ScoreCardOrderByWithRelationInputSchema ]).optional(),
  cursor: ScoreCardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScoreCardScalarFieldEnumSchema,ScoreCardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScoreCardFindManyArgsSchema: z.ZodType<Prisma.ScoreCardFindManyArgs> = z.object({
  select: ScoreCardSelectSchema.optional(),
  include: ScoreCardIncludeSchema.optional(),
  where: ScoreCardWhereInputSchema.optional(),
  orderBy: z.union([ ScoreCardOrderByWithRelationInputSchema.array(),ScoreCardOrderByWithRelationInputSchema ]).optional(),
  cursor: ScoreCardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScoreCardScalarFieldEnumSchema,ScoreCardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScoreCardAggregateArgsSchema: z.ZodType<Prisma.ScoreCardAggregateArgs> = z.object({
  where: ScoreCardWhereInputSchema.optional(),
  orderBy: z.union([ ScoreCardOrderByWithRelationInputSchema.array(),ScoreCardOrderByWithRelationInputSchema ]).optional(),
  cursor: ScoreCardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ScoreCardGroupByArgsSchema: z.ZodType<Prisma.ScoreCardGroupByArgs> = z.object({
  where: ScoreCardWhereInputSchema.optional(),
  orderBy: z.union([ ScoreCardOrderByWithAggregationInputSchema.array(),ScoreCardOrderByWithAggregationInputSchema ]).optional(),
  by: ScoreCardScalarFieldEnumSchema.array(),
  having: ScoreCardScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ScoreCardFindUniqueArgsSchema: z.ZodType<Prisma.ScoreCardFindUniqueArgs> = z.object({
  select: ScoreCardSelectSchema.optional(),
  include: ScoreCardIncludeSchema.optional(),
  where: ScoreCardWhereUniqueInputSchema,
}).strict() ;

export const ScoreCardFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ScoreCardFindUniqueOrThrowArgs> = z.object({
  select: ScoreCardSelectSchema.optional(),
  include: ScoreCardIncludeSchema.optional(),
  where: ScoreCardWhereUniqueInputSchema,
}).strict() ;

export const CourseFindFirstArgsSchema: z.ZodType<Prisma.CourseFindFirstArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereInputSchema.optional(),
  orderBy: z.union([ CourseOrderByWithRelationInputSchema.array(),CourseOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseScalarFieldEnumSchema,CourseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CourseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CourseFindFirstOrThrowArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereInputSchema.optional(),
  orderBy: z.union([ CourseOrderByWithRelationInputSchema.array(),CourseOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseScalarFieldEnumSchema,CourseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CourseFindManyArgsSchema: z.ZodType<Prisma.CourseFindManyArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereInputSchema.optional(),
  orderBy: z.union([ CourseOrderByWithRelationInputSchema.array(),CourseOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseScalarFieldEnumSchema,CourseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CourseAggregateArgsSchema: z.ZodType<Prisma.CourseAggregateArgs> = z.object({
  where: CourseWhereInputSchema.optional(),
  orderBy: z.union([ CourseOrderByWithRelationInputSchema.array(),CourseOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CourseGroupByArgsSchema: z.ZodType<Prisma.CourseGroupByArgs> = z.object({
  where: CourseWhereInputSchema.optional(),
  orderBy: z.union([ CourseOrderByWithAggregationInputSchema.array(),CourseOrderByWithAggregationInputSchema ]).optional(),
  by: CourseScalarFieldEnumSchema.array(),
  having: CourseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CourseFindUniqueArgsSchema: z.ZodType<Prisma.CourseFindUniqueArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereUniqueInputSchema,
}).strict() ;

export const CourseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CourseFindUniqueOrThrowArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereUniqueInputSchema,
}).strict() ;

export const BasketFindFirstArgsSchema: z.ZodType<Prisma.BasketFindFirstArgs> = z.object({
  select: BasketSelectSchema.optional(),
  include: BasketIncludeSchema.optional(),
  where: BasketWhereInputSchema.optional(),
  orderBy: z.union([ BasketOrderByWithRelationInputSchema.array(),BasketOrderByWithRelationInputSchema ]).optional(),
  cursor: BasketWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BasketScalarFieldEnumSchema,BasketScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BasketFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BasketFindFirstOrThrowArgs> = z.object({
  select: BasketSelectSchema.optional(),
  include: BasketIncludeSchema.optional(),
  where: BasketWhereInputSchema.optional(),
  orderBy: z.union([ BasketOrderByWithRelationInputSchema.array(),BasketOrderByWithRelationInputSchema ]).optional(),
  cursor: BasketWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BasketScalarFieldEnumSchema,BasketScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BasketFindManyArgsSchema: z.ZodType<Prisma.BasketFindManyArgs> = z.object({
  select: BasketSelectSchema.optional(),
  include: BasketIncludeSchema.optional(),
  where: BasketWhereInputSchema.optional(),
  orderBy: z.union([ BasketOrderByWithRelationInputSchema.array(),BasketOrderByWithRelationInputSchema ]).optional(),
  cursor: BasketWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BasketScalarFieldEnumSchema,BasketScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BasketAggregateArgsSchema: z.ZodType<Prisma.BasketAggregateArgs> = z.object({
  where: BasketWhereInputSchema.optional(),
  orderBy: z.union([ BasketOrderByWithRelationInputSchema.array(),BasketOrderByWithRelationInputSchema ]).optional(),
  cursor: BasketWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BasketGroupByArgsSchema: z.ZodType<Prisma.BasketGroupByArgs> = z.object({
  where: BasketWhereInputSchema.optional(),
  orderBy: z.union([ BasketOrderByWithAggregationInputSchema.array(),BasketOrderByWithAggregationInputSchema ]).optional(),
  by: BasketScalarFieldEnumSchema.array(),
  having: BasketScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BasketFindUniqueArgsSchema: z.ZodType<Prisma.BasketFindUniqueArgs> = z.object({
  select: BasketSelectSchema.optional(),
  include: BasketIncludeSchema.optional(),
  where: BasketWhereUniqueInputSchema,
}).strict() ;

export const BasketFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BasketFindUniqueOrThrowArgs> = z.object({
  select: BasketSelectSchema.optional(),
  include: BasketIncludeSchema.optional(),
  where: BasketWhereUniqueInputSchema,
}).strict() ;

export const ScoreFindFirstArgsSchema: z.ZodType<Prisma.ScoreFindFirstArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  include: ScoreIncludeSchema.optional(),
  where: ScoreWhereInputSchema.optional(),
  orderBy: z.union([ ScoreOrderByWithRelationInputSchema.array(),ScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: ScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScoreScalarFieldEnumSchema,ScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScoreFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ScoreFindFirstOrThrowArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  include: ScoreIncludeSchema.optional(),
  where: ScoreWhereInputSchema.optional(),
  orderBy: z.union([ ScoreOrderByWithRelationInputSchema.array(),ScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: ScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScoreScalarFieldEnumSchema,ScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScoreFindManyArgsSchema: z.ZodType<Prisma.ScoreFindManyArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  include: ScoreIncludeSchema.optional(),
  where: ScoreWhereInputSchema.optional(),
  orderBy: z.union([ ScoreOrderByWithRelationInputSchema.array(),ScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: ScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScoreScalarFieldEnumSchema,ScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScoreAggregateArgsSchema: z.ZodType<Prisma.ScoreAggregateArgs> = z.object({
  where: ScoreWhereInputSchema.optional(),
  orderBy: z.union([ ScoreOrderByWithRelationInputSchema.array(),ScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: ScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ScoreGroupByArgsSchema: z.ZodType<Prisma.ScoreGroupByArgs> = z.object({
  where: ScoreWhereInputSchema.optional(),
  orderBy: z.union([ ScoreOrderByWithAggregationInputSchema.array(),ScoreOrderByWithAggregationInputSchema ]).optional(),
  by: ScoreScalarFieldEnumSchema.array(),
  having: ScoreScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ScoreFindUniqueArgsSchema: z.ZodType<Prisma.ScoreFindUniqueArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  include: ScoreIncludeSchema.optional(),
  where: ScoreWhereUniqueInputSchema,
}).strict() ;

export const ScoreFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ScoreFindUniqueOrThrowArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  include: ScoreIncludeSchema.optional(),
  where: ScoreWhereUniqueInputSchema,
}).strict() ;

export const CourseResultFindFirstArgsSchema: z.ZodType<Prisma.CourseResultFindFirstArgs> = z.object({
  select: CourseResultSelectSchema.optional(),
  include: CourseResultIncludeSchema.optional(),
  where: CourseResultWhereInputSchema.optional(),
  orderBy: z.union([ CourseResultOrderByWithRelationInputSchema.array(),CourseResultOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseResultScalarFieldEnumSchema,CourseResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CourseResultFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CourseResultFindFirstOrThrowArgs> = z.object({
  select: CourseResultSelectSchema.optional(),
  include: CourseResultIncludeSchema.optional(),
  where: CourseResultWhereInputSchema.optional(),
  orderBy: z.union([ CourseResultOrderByWithRelationInputSchema.array(),CourseResultOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseResultScalarFieldEnumSchema,CourseResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CourseResultFindManyArgsSchema: z.ZodType<Prisma.CourseResultFindManyArgs> = z.object({
  select: CourseResultSelectSchema.optional(),
  include: CourseResultIncludeSchema.optional(),
  where: CourseResultWhereInputSchema.optional(),
  orderBy: z.union([ CourseResultOrderByWithRelationInputSchema.array(),CourseResultOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseResultScalarFieldEnumSchema,CourseResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CourseResultAggregateArgsSchema: z.ZodType<Prisma.CourseResultAggregateArgs> = z.object({
  where: CourseResultWhereInputSchema.optional(),
  orderBy: z.union([ CourseResultOrderByWithRelationInputSchema.array(),CourseResultOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CourseResultGroupByArgsSchema: z.ZodType<Prisma.CourseResultGroupByArgs> = z.object({
  where: CourseResultWhereInputSchema.optional(),
  orderBy: z.union([ CourseResultOrderByWithAggregationInputSchema.array(),CourseResultOrderByWithAggregationInputSchema ]).optional(),
  by: CourseResultScalarFieldEnumSchema.array(),
  having: CourseResultScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CourseResultFindUniqueArgsSchema: z.ZodType<Prisma.CourseResultFindUniqueArgs> = z.object({
  select: CourseResultSelectSchema.optional(),
  include: CourseResultIncludeSchema.optional(),
  where: CourseResultWhereUniqueInputSchema,
}).strict() ;

export const CourseResultFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CourseResultFindUniqueOrThrowArgs> = z.object({
  select: CourseResultSelectSchema.optional(),
  include: CourseResultIncludeSchema.optional(),
  where: CourseResultWhereUniqueInputSchema,
}).strict() ;

export const PlayerFindFirstArgsSchema: z.ZodType<Prisma.PlayerFindFirstArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithRelationInputSchema.array(),PlayerOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayerScalarFieldEnumSchema,PlayerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PlayerFindFirstOrThrowArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithRelationInputSchema.array(),PlayerOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayerScalarFieldEnumSchema,PlayerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayerFindManyArgsSchema: z.ZodType<Prisma.PlayerFindManyArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithRelationInputSchema.array(),PlayerOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayerScalarFieldEnumSchema,PlayerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayerAggregateArgsSchema: z.ZodType<Prisma.PlayerAggregateArgs> = z.object({
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithRelationInputSchema.array(),PlayerOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlayerGroupByArgsSchema: z.ZodType<Prisma.PlayerGroupByArgs> = z.object({
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithAggregationInputSchema.array(),PlayerOrderByWithAggregationInputSchema ]).optional(),
  by: PlayerScalarFieldEnumSchema.array(),
  having: PlayerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlayerFindUniqueArgsSchema: z.ZodType<Prisma.PlayerFindUniqueArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereUniqueInputSchema,
}).strict() ;

export const PlayerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PlayerFindUniqueOrThrowArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const ScoreCardCreateArgsSchema: z.ZodType<Prisma.ScoreCardCreateArgs> = z.object({
  select: ScoreCardSelectSchema.optional(),
  include: ScoreCardIncludeSchema.optional(),
  data: z.union([ ScoreCardCreateInputSchema,ScoreCardUncheckedCreateInputSchema ]),
}).strict() ;

export const ScoreCardUpsertArgsSchema: z.ZodType<Prisma.ScoreCardUpsertArgs> = z.object({
  select: ScoreCardSelectSchema.optional(),
  include: ScoreCardIncludeSchema.optional(),
  where: ScoreCardWhereUniqueInputSchema,
  create: z.union([ ScoreCardCreateInputSchema,ScoreCardUncheckedCreateInputSchema ]),
  update: z.union([ ScoreCardUpdateInputSchema,ScoreCardUncheckedUpdateInputSchema ]),
}).strict() ;

export const ScoreCardCreateManyArgsSchema: z.ZodType<Prisma.ScoreCardCreateManyArgs> = z.object({
  data: z.union([ ScoreCardCreateManyInputSchema,ScoreCardCreateManyInputSchema.array() ]),
}).strict() ;

export const ScoreCardCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ScoreCardCreateManyAndReturnArgs> = z.object({
  data: z.union([ ScoreCardCreateManyInputSchema,ScoreCardCreateManyInputSchema.array() ]),
}).strict() ;

export const ScoreCardDeleteArgsSchema: z.ZodType<Prisma.ScoreCardDeleteArgs> = z.object({
  select: ScoreCardSelectSchema.optional(),
  include: ScoreCardIncludeSchema.optional(),
  where: ScoreCardWhereUniqueInputSchema,
}).strict() ;

export const ScoreCardUpdateArgsSchema: z.ZodType<Prisma.ScoreCardUpdateArgs> = z.object({
  select: ScoreCardSelectSchema.optional(),
  include: ScoreCardIncludeSchema.optional(),
  data: z.union([ ScoreCardUpdateInputSchema,ScoreCardUncheckedUpdateInputSchema ]),
  where: ScoreCardWhereUniqueInputSchema,
}).strict() ;

export const ScoreCardUpdateManyArgsSchema: z.ZodType<Prisma.ScoreCardUpdateManyArgs> = z.object({
  data: z.union([ ScoreCardUpdateManyMutationInputSchema,ScoreCardUncheckedUpdateManyInputSchema ]),
  where: ScoreCardWhereInputSchema.optional(),
}).strict() ;

export const ScoreCardDeleteManyArgsSchema: z.ZodType<Prisma.ScoreCardDeleteManyArgs> = z.object({
  where: ScoreCardWhereInputSchema.optional(),
}).strict() ;

export const CourseCreateArgsSchema: z.ZodType<Prisma.CourseCreateArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  data: z.union([ CourseCreateInputSchema,CourseUncheckedCreateInputSchema ]),
}).strict() ;

export const CourseUpsertArgsSchema: z.ZodType<Prisma.CourseUpsertArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereUniqueInputSchema,
  create: z.union([ CourseCreateInputSchema,CourseUncheckedCreateInputSchema ]),
  update: z.union([ CourseUpdateInputSchema,CourseUncheckedUpdateInputSchema ]),
}).strict() ;

export const CourseCreateManyArgsSchema: z.ZodType<Prisma.CourseCreateManyArgs> = z.object({
  data: z.union([ CourseCreateManyInputSchema,CourseCreateManyInputSchema.array() ]),
}).strict() ;

export const CourseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CourseCreateManyAndReturnArgs> = z.object({
  data: z.union([ CourseCreateManyInputSchema,CourseCreateManyInputSchema.array() ]),
}).strict() ;

export const CourseDeleteArgsSchema: z.ZodType<Prisma.CourseDeleteArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereUniqueInputSchema,
}).strict() ;

export const CourseUpdateArgsSchema: z.ZodType<Prisma.CourseUpdateArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  data: z.union([ CourseUpdateInputSchema,CourseUncheckedUpdateInputSchema ]),
  where: CourseWhereUniqueInputSchema,
}).strict() ;

export const CourseUpdateManyArgsSchema: z.ZodType<Prisma.CourseUpdateManyArgs> = z.object({
  data: z.union([ CourseUpdateManyMutationInputSchema,CourseUncheckedUpdateManyInputSchema ]),
  where: CourseWhereInputSchema.optional(),
}).strict() ;

export const CourseDeleteManyArgsSchema: z.ZodType<Prisma.CourseDeleteManyArgs> = z.object({
  where: CourseWhereInputSchema.optional(),
}).strict() ;

export const BasketCreateArgsSchema: z.ZodType<Prisma.BasketCreateArgs> = z.object({
  select: BasketSelectSchema.optional(),
  include: BasketIncludeSchema.optional(),
  data: z.union([ BasketCreateInputSchema,BasketUncheckedCreateInputSchema ]),
}).strict() ;

export const BasketUpsertArgsSchema: z.ZodType<Prisma.BasketUpsertArgs> = z.object({
  select: BasketSelectSchema.optional(),
  include: BasketIncludeSchema.optional(),
  where: BasketWhereUniqueInputSchema,
  create: z.union([ BasketCreateInputSchema,BasketUncheckedCreateInputSchema ]),
  update: z.union([ BasketUpdateInputSchema,BasketUncheckedUpdateInputSchema ]),
}).strict() ;

export const BasketCreateManyArgsSchema: z.ZodType<Prisma.BasketCreateManyArgs> = z.object({
  data: z.union([ BasketCreateManyInputSchema,BasketCreateManyInputSchema.array() ]),
}).strict() ;

export const BasketCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BasketCreateManyAndReturnArgs> = z.object({
  data: z.union([ BasketCreateManyInputSchema,BasketCreateManyInputSchema.array() ]),
}).strict() ;

export const BasketDeleteArgsSchema: z.ZodType<Prisma.BasketDeleteArgs> = z.object({
  select: BasketSelectSchema.optional(),
  include: BasketIncludeSchema.optional(),
  where: BasketWhereUniqueInputSchema,
}).strict() ;

export const BasketUpdateArgsSchema: z.ZodType<Prisma.BasketUpdateArgs> = z.object({
  select: BasketSelectSchema.optional(),
  include: BasketIncludeSchema.optional(),
  data: z.union([ BasketUpdateInputSchema,BasketUncheckedUpdateInputSchema ]),
  where: BasketWhereUniqueInputSchema,
}).strict() ;

export const BasketUpdateManyArgsSchema: z.ZodType<Prisma.BasketUpdateManyArgs> = z.object({
  data: z.union([ BasketUpdateManyMutationInputSchema,BasketUncheckedUpdateManyInputSchema ]),
  where: BasketWhereInputSchema.optional(),
}).strict() ;

export const BasketDeleteManyArgsSchema: z.ZodType<Prisma.BasketDeleteManyArgs> = z.object({
  where: BasketWhereInputSchema.optional(),
}).strict() ;

export const ScoreCreateArgsSchema: z.ZodType<Prisma.ScoreCreateArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  include: ScoreIncludeSchema.optional(),
  data: z.union([ ScoreCreateInputSchema,ScoreUncheckedCreateInputSchema ]),
}).strict() ;

export const ScoreUpsertArgsSchema: z.ZodType<Prisma.ScoreUpsertArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  include: ScoreIncludeSchema.optional(),
  where: ScoreWhereUniqueInputSchema,
  create: z.union([ ScoreCreateInputSchema,ScoreUncheckedCreateInputSchema ]),
  update: z.union([ ScoreUpdateInputSchema,ScoreUncheckedUpdateInputSchema ]),
}).strict() ;

export const ScoreCreateManyArgsSchema: z.ZodType<Prisma.ScoreCreateManyArgs> = z.object({
  data: z.union([ ScoreCreateManyInputSchema,ScoreCreateManyInputSchema.array() ]),
}).strict() ;

export const ScoreCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ScoreCreateManyAndReturnArgs> = z.object({
  data: z.union([ ScoreCreateManyInputSchema,ScoreCreateManyInputSchema.array() ]),
}).strict() ;

export const ScoreDeleteArgsSchema: z.ZodType<Prisma.ScoreDeleteArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  include: ScoreIncludeSchema.optional(),
  where: ScoreWhereUniqueInputSchema,
}).strict() ;

export const ScoreUpdateArgsSchema: z.ZodType<Prisma.ScoreUpdateArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  include: ScoreIncludeSchema.optional(),
  data: z.union([ ScoreUpdateInputSchema,ScoreUncheckedUpdateInputSchema ]),
  where: ScoreWhereUniqueInputSchema,
}).strict() ;

export const ScoreUpdateManyArgsSchema: z.ZodType<Prisma.ScoreUpdateManyArgs> = z.object({
  data: z.union([ ScoreUpdateManyMutationInputSchema,ScoreUncheckedUpdateManyInputSchema ]),
  where: ScoreWhereInputSchema.optional(),
}).strict() ;

export const ScoreDeleteManyArgsSchema: z.ZodType<Prisma.ScoreDeleteManyArgs> = z.object({
  where: ScoreWhereInputSchema.optional(),
}).strict() ;

export const CourseResultCreateArgsSchema: z.ZodType<Prisma.CourseResultCreateArgs> = z.object({
  select: CourseResultSelectSchema.optional(),
  include: CourseResultIncludeSchema.optional(),
  data: z.union([ CourseResultCreateInputSchema,CourseResultUncheckedCreateInputSchema ]),
}).strict() ;

export const CourseResultUpsertArgsSchema: z.ZodType<Prisma.CourseResultUpsertArgs> = z.object({
  select: CourseResultSelectSchema.optional(),
  include: CourseResultIncludeSchema.optional(),
  where: CourseResultWhereUniqueInputSchema,
  create: z.union([ CourseResultCreateInputSchema,CourseResultUncheckedCreateInputSchema ]),
  update: z.union([ CourseResultUpdateInputSchema,CourseResultUncheckedUpdateInputSchema ]),
}).strict() ;

export const CourseResultCreateManyArgsSchema: z.ZodType<Prisma.CourseResultCreateManyArgs> = z.object({
  data: z.union([ CourseResultCreateManyInputSchema,CourseResultCreateManyInputSchema.array() ]),
}).strict() ;

export const CourseResultCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CourseResultCreateManyAndReturnArgs> = z.object({
  data: z.union([ CourseResultCreateManyInputSchema,CourseResultCreateManyInputSchema.array() ]),
}).strict() ;

export const CourseResultDeleteArgsSchema: z.ZodType<Prisma.CourseResultDeleteArgs> = z.object({
  select: CourseResultSelectSchema.optional(),
  include: CourseResultIncludeSchema.optional(),
  where: CourseResultWhereUniqueInputSchema,
}).strict() ;

export const CourseResultUpdateArgsSchema: z.ZodType<Prisma.CourseResultUpdateArgs> = z.object({
  select: CourseResultSelectSchema.optional(),
  include: CourseResultIncludeSchema.optional(),
  data: z.union([ CourseResultUpdateInputSchema,CourseResultUncheckedUpdateInputSchema ]),
  where: CourseResultWhereUniqueInputSchema,
}).strict() ;

export const CourseResultUpdateManyArgsSchema: z.ZodType<Prisma.CourseResultUpdateManyArgs> = z.object({
  data: z.union([ CourseResultUpdateManyMutationInputSchema,CourseResultUncheckedUpdateManyInputSchema ]),
  where: CourseResultWhereInputSchema.optional(),
}).strict() ;

export const CourseResultDeleteManyArgsSchema: z.ZodType<Prisma.CourseResultDeleteManyArgs> = z.object({
  where: CourseResultWhereInputSchema.optional(),
}).strict() ;

export const PlayerCreateArgsSchema: z.ZodType<Prisma.PlayerCreateArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  data: z.union([ PlayerCreateInputSchema,PlayerUncheckedCreateInputSchema ]),
}).strict() ;

export const PlayerUpsertArgsSchema: z.ZodType<Prisma.PlayerUpsertArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereUniqueInputSchema,
  create: z.union([ PlayerCreateInputSchema,PlayerUncheckedCreateInputSchema ]),
  update: z.union([ PlayerUpdateInputSchema,PlayerUncheckedUpdateInputSchema ]),
}).strict() ;

export const PlayerCreateManyArgsSchema: z.ZodType<Prisma.PlayerCreateManyArgs> = z.object({
  data: z.union([ PlayerCreateManyInputSchema,PlayerCreateManyInputSchema.array() ]),
}).strict() ;

export const PlayerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PlayerCreateManyAndReturnArgs> = z.object({
  data: z.union([ PlayerCreateManyInputSchema,PlayerCreateManyInputSchema.array() ]),
}).strict() ;

export const PlayerDeleteArgsSchema: z.ZodType<Prisma.PlayerDeleteArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereUniqueInputSchema,
}).strict() ;

export const PlayerUpdateArgsSchema: z.ZodType<Prisma.PlayerUpdateArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  data: z.union([ PlayerUpdateInputSchema,PlayerUncheckedUpdateInputSchema ]),
  where: PlayerWhereUniqueInputSchema,
}).strict() ;

export const PlayerUpdateManyArgsSchema: z.ZodType<Prisma.PlayerUpdateManyArgs> = z.object({
  data: z.union([ PlayerUpdateManyMutationInputSchema,PlayerUncheckedUpdateManyInputSchema ]),
  where: PlayerWhereInputSchema.optional(),
}).strict() ;

export const PlayerDeleteManyArgsSchema: z.ZodType<Prisma.PlayerDeleteManyArgs> = z.object({
  where: PlayerWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;