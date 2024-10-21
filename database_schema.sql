-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_sign_in TIMESTAMP WITH TIME ZONE
);

-- Bird Types Table
CREATE TABLE bird_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT
);

-- Birds Table
CREATE TABLE birds (
  id SERIAL PRIMARY KEY,
  type_id INTEGER REFERENCES bird_types(id),
  name TEXT NOT NULL,
  scientific_name TEXT,
  description TEXT,
  image_url TEXT,
  sound_url TEXT
);

-- Habitats Table
CREATE TABLE habitats (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

-- Bird-Habitat Relationship Table
CREATE TABLE bird_habitats (
  bird_id INTEGER REFERENCES birds(id),
  habitat_id INTEGER REFERENCES habitats(id),
  PRIMARY KEY (bird_id, habitat_id)
);

-- Foods Table
CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

-- Bird-Food Relationship Table
CREATE TABLE bird_foods (
  bird_id INTEGER REFERENCES birds(id),
  food_id INTEGER REFERENCES foods(id),
  PRIMARY KEY (bird_id, food_id)
);

-- Forum Topics Table
CREATE TABLE forum_topics (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Forum Replies Table
CREATE TABLE forum_replies (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER REFERENCES forum_topics(id),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bird Recognition Logs Table
CREATE TABLE bird_recognition_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  image_url TEXT,
  recognized_bird_id INTEGER REFERENCES birds(id),
  confidence_score FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Bird Likes Table
CREATE TABLE user_bird_likes (
  user_id UUID REFERENCES users(id),
  bird_id INTEGER REFERENCES birds(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, bird_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_birds_type_id ON birds(type_id);
CREATE INDEX idx_bird_habitats_bird_id ON bird_habitats(bird_id);
CREATE INDEX idx_bird_habitats_habitat_id ON bird_habitats(habitat_id);
CREATE INDEX idx_bird_foods_bird_id ON bird_foods(bird_id);
CREATE INDEX idx_bird_foods_food_id ON bird_foods(food_id);
CREATE INDEX idx_forum_topics_user_id ON forum_topics(user_id);
CREATE INDEX idx_forum_replies_topic_id ON forum_replies(topic_id);
CREATE INDEX idx_forum_replies_user_id ON forum_replies(user_id);
CREATE INDEX idx_bird_recognition_logs_user_id ON bird_recognition_logs(user_id);
CREATE INDEX idx_bird_recognition_logs_recognized_bird_id ON bird_recognition_logs(recognized_bird_id);
CREATE INDEX idx_user_bird_likes_user_id ON user_bird_likes(user_id);
CREATE INDEX idx_user_bird_likes_bird_id ON user_bird_likes(bird_id);