-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS recipes CASCADE;
-- DROP TABLE IF EXISTS workouts CASCADE;
-- DROP TABLE IF EXISTS user_workouts CASCADE;
-- DROP TABLE IF EXISTS user_recipes CASCADE;
-- DROP TABLE IF EXISTS food_categories CASCADE;
-- DROP TABLE IF EXISTS drinks_tracking CASCADE;
-- DROP TABLE IF EXISTS drinks CASCADE;
-- DROP TABLE IF EXISTS drink_info CASCADE;



-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY  NOT NULL,
--   first_name VARCHAR(30)  NOT NULL,
--   last_name VARCHAR(30)  NOT NULL,
--   email VARCHAR(30)  NOT NULL,
--   password VARCHAR(250)  NOT NULL,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   age BIGINT,
--   weight BIGINT,
--   height BIGINT,
--   Location VARCHAR(50),
--   bio VARCHAR(250),
--   image_url TEXT 
-- );


-- CREATE TABLE recipes (
--   id SERIAL PRIMARY KEY NOT NULL,
--   recipe_title VARCHAR(250) NOT NULL,
--   recipe_description VARCHAR(500) NOT NULL,
--   prep_time BIGINT,
--   cook_time BIGINT,
--   ingredients VARCHAR(250) NOT NULL,
--   photo_url TEXT 
-- );


-- CREATE TABLE workouts (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(250) NOT NULL,
--   difficulty INTEGER,
--   workout_description VARCHAR(250) NOT NULL,
--   image_url TEXT,
--   video_url TEXT,
--   duration VARCHAR(250) 
-- );


-- CREATE TABLE user_workouts (
--   id SERIAL PRIMARY KEY NOT NULL,
--   user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
--   workout_id BIGINT REFERENCES workouts(id) ON DELETE CASCADE
-- );


-- CREATE TABLE user_recipes (
--   id SERIAL PRIMARY KEY NOT NULL,
--   user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
--   recipe_id BIGINT REFERENCES recipes(id) ON DELETE CASCADE
-- );


-- CREATE TABLE food_categories (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(250) NOT NULL,
--   recipe_id BIGINT REFERENCES recipes(id) ON DELETE CASCADE
-- );


-- CREATE TABLE drinks_tracking (
--   id SERIAL PRIMARY KEY NOT NULL,
--   user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
--   day DATE NOT NULL
-- );


-- CREATE TABLE drinks (
--   id SERIAL PRIMARY KEY NOT NULL,
--   count BIGINT NOT NULL DEFAULT 0,
--   drinks_tracking_id BIGINT REFERENCES drinks_tracking(id) ON DELETE CASCADE
-- );


-- CREATE TABLE drink_info (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(100) NOT NULL,
--   calories BIGINT,
--   drink_id BIGINT REFERENCES drinks(id) ON DELETE CASCADE
-- );






-- INSERT INTO users (first_name, last_name, email, password)
--   VALUES ('Jerry','Jones', 'jerry@example.com','test123'), ('Sam','Diaz', 'sam@example.com','test123');

-- INSERT INTO recipes (recipe_title, recipe_description, prep_time, cook_time, ingredients, photo_url)
--   VALUES ('Cheeseburger', 'Meat between two pieces of bread otherwise known as a bun or a roll, with cheese on top of the meat, sometimes served with lettuce tomatoe and other garnishes', 20, 10, 'ground beef, cheese, bun, lettuce, tomato', 'https://www.simplyrecipes.com/wp-content/uploads/2019/04/Stovetop-Cheeseburgers-hero1v2.jpg');

-- INSERT INTO workouts (name, difficulty, workout_description, image_url, video_url, duration)
--   VALUES ('calf raises', 3, 'The standing calf raise exercise targets your calf muscles, particularly the larger, outermost muscle that is responsible for the shape and size of your calves.', 'https://experiencelife.com/wp-content/uploads/2019/02/Calf-Raise-1280x720.jpg', 'https://www.youtube.com/watch?v=TtfwCeVhdQM', '3 sets of 15 reps');

-- INSERT INTO user_workouts (user_id, workout_id)
--   VALUES (1, 1);

-- INSERT INTO user_recipes (user_id, recipe_id)
--   VALUES (1, 1);

-- INSERT INTO food_categories (name, recipe_id)
--   VALUES ('sandwich', 1);

-- INSERT INTO drinks_tracking (user_id, day)
--   VALUES (1, '01/01/2019');

-- INSERT INTO drinks (count, drinks_tracking_id)
--   VALUES (14, 1), (5, 1), (6, 1);

-- INSERT INTO drink_info (name, calories, drink_id)
--   VALUES ('soda', 160, 1), ('coffee', 5, 2), ('water', 0, 3) ;



