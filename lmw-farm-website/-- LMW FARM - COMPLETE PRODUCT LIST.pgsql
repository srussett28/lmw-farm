-- LMW FARM - COMPLETE PRODUCT LIST
-- Matches frontend Products page design

-- Clear existing sample products first (optional - comment out if you want to keep them)
-- DELETE FROM dim_products;

-- ============================================
-- ANIMAL PRODUCTS - EGGS
-- ============================================

INSERT INTO dim_products (product_name, category, subcategory, description, unit_price, is_active) VALUES
('Rainbow Dozen Eggs', 'animal', 'eggs', 'Fresh farm eggs - mixed colors from our heritage breeds including chocolate brown, blue, green, and light brown eggs', 6.00, TRUE),
('Two Dozen Eggs Special', 'animal', 'eggs', 'Save $2 when you buy 2 dozen fresh farm eggs', 10.00, TRUE);

-- ============================================
-- ANIMAL PRODUCTS - CHICKS (4 BREEDS)
-- ============================================

-- Black Copper Marans
INSERT INTO dim_products (product_name, category, subcategory, breed, product_type, description, unit_price, is_active) VALUES
('Black Copper Marans - Straight Run', 'animal', 'chicks', 'Black Copper Marans', 'straight_run', 'Day-old chick, unsexed. Dark chocolate brown eggs, docile temperament', 8.00, TRUE),
('Black Copper Marans - Pullet', 'animal', 'chicks', 'Black Copper Marans', 'pullet', 'Day-old female chick. Dark chocolate brown eggs, excellent layers', 12.00, TRUE),
('Black Copper Marans - Rooster', 'animal', 'chicks', 'Black Copper Marans', 'rooster', 'Day-old male chick. Beautiful dark plumage', 5.00, TRUE);

-- Cream Legbar
INSERT INTO dim_products (product_name, category, subcategory, breed, product_type, description, unit_price, is_active) VALUES
('Cream Legbar - Straight Run', 'animal', 'chicks', 'Cream Legbar', 'straight_run', 'Day-old chick, unsexed. Blue eggs, auto-sexing breed', 8.00, TRUE),
('Cream Legbar - Pullet', 'animal', 'chicks', 'Cream Legbar', 'pullet', 'Day-old female chick. Beautiful blue eggs, friendly birds', 12.00, TRUE),
('Cream Legbar - Rooster', 'animal', 'chicks', 'Cream Legbar', 'rooster', 'Day-old male chick. Stunning cream and grey plumage', 5.00, TRUE);

-- Barred Plymouth Rock (Barred Rocks)
INSERT INTO dim_products (product_name, category, subcategory, breed, product_type, description, unit_price, is_active) VALUES
('Barred Rock - Straight Run', 'animal', 'chicks', 'Barred Plymouth Rock', 'straight_run', 'Day-old chick, unsexed. Light brown eggs, hardy classic American breed', 8.00, TRUE),
('Barred Rock - Pullet', 'animal', 'chicks', 'Barred Plymouth Rock', 'pullet', 'Day-old female chick. Reliable layers, cold-hardy', 12.00, TRUE),
('Barred Rock - Rooster', 'animal', 'chicks', 'Barred Plymouth Rock', 'rooster', 'Day-old male chick. Classic black and white barred pattern', 5.00, TRUE);

-- Ameraucana
INSERT INTO dim_products (product_name, category, subcategory, breed, product_type, description, unit_price, is_active) VALUES
('Ameraucana - Straight Run', 'animal', 'chicks', 'Ameraucana', 'straight_run', 'Day-old chick, unsexed. Blue/green eggs, fluffy cheeks', 8.00, TRUE),
('Ameraucana - Pullet', 'animal', 'chicks', 'Ameraucana', 'pullet', 'Day-old female chick. Beautiful blue-green eggs, calm temperament', 12.00, TRUE),
('Ameraucana - Rooster', 'animal', 'chicks', 'Ameraucana', 'rooster', 'Day-old male chick. Fluffy muffs and beard', 5.00, TRUE);

-- ============================================
-- ANIMAL PRODUCTS - HONEY
-- ============================================

INSERT INTO dim_products (product_name, category, subcategory, description, unit_price, is_active) VALUES
('Raw Local Honey - Small Jar', 'animal', 'honey', 'Raw, unfiltered honey from our hives. Small mason jar (8oz)', 12.00, TRUE);

-- ============================================
-- ANIMAL PRODUCTS - BUTTER (3 HERB VARIETIES)
-- ============================================

INSERT INTO dim_products (product_name, category, subcategory, description, unit_price, is_active) VALUES
('Garlic & Herb Butter', 'animal', 'butter', 'Cultured butter with fresh garlic, rosemary, and thyme from our farm', 10.00, TRUE),
('Honey Cinnamon Butter', 'animal', 'butter', 'Sweet butter with our raw honey and cinnamon - perfect for toast and baking', 10.00, TRUE),
('Rosemary Sea Salt Butter', 'animal', 'butter', 'Cultured butter with fresh rosemary and coarse sea salt', 10.00, TRUE);

-- ============================================
-- ANIMAL PRODUCTS - CALVES (HIGHLAND CATTLE)
-- ============================================

INSERT INTO dim_products (product_name, category, subcategory, description, unit_price, is_active) VALUES
('Highland Cattle - Bull Calf', 'animal', 'calves', 'Registered Highland bull calf. Contact for availability and pricing', 0.00, TRUE),
('Highland Cattle - Heifer Calf', 'animal', 'calves', 'Registered Highland heifer calf. Contact for availability and pricing', 0.00, TRUE);

-- ============================================
-- PLANT PRODUCTS - HERBS & SPICES
-- ============================================

INSERT INTO dim_products (product_name, category, subcategory, description, unit_price, is_active) VALUES
('Fresh Basil Bunch', 'plant', 'herbs', 'Fresh cut basil from our greenhouse', 4.00, TRUE),
('Fresh Oregano Bunch', 'plant', 'herbs', 'Fresh cut oregano from our greenhouse', 4.00, TRUE),
('Fresh Rosemary Bunch', 'plant', 'herbs', 'Fresh cut rosemary from our greenhouse', 4.00, TRUE),
('Fresh Sage Bunch', 'plant', 'herbs', 'Fresh cut sage from our greenhouse', 4.00, TRUE),
('Fresh Thyme Bunch', 'plant', 'herbs', 'Fresh cut thyme from our greenhouse', 4.00, TRUE),
('Fresh Dill Bunch', 'plant', 'herbs', 'Fresh cut dill from our greenhouse', 4.00, TRUE),
('Fresh Cilantro Bunch', 'plant', 'herbs', 'Fresh cut cilantro from our greenhouse', 4.00, TRUE),
('Fresh Chives Bunch', 'plant', 'herbs', 'Fresh cut chives from our greenhouse', 4.00, TRUE),
('Fresh Parsley Bunch', 'plant', 'herbs', 'Fresh cut parsley from our greenhouse', 4.00, TRUE),
('Garlic Bulb', 'plant', 'herbs', 'Fresh garlic bulb from our farm', 3.00, TRUE);

-- ============================================
-- PLANT PRODUCTS - BLUEBERRIES
-- ============================================

INSERT INTO dim_products (product_name, category, subcategory, description, unit_price, is_active) VALUES
('Fresh Blueberries - Pint', 'plant', 'blueberries', 'Fresh-picked blueberries from our field (1 pint)', 8.00, TRUE),
('Fresh Blueberries - Quart', 'plant', 'blueberries', 'Fresh-picked blueberries from our field (1 quart)', 15.00, TRUE);

-- ============================================
-- PLANT PRODUCTS - POTATOES
-- ============================================

INSERT INTO dim_products (product_name, category, subcategory, description, unit_price, is_active) VALUES
('Red Potatoes - 5lb Bag', 'plant', 'potatoes', 'Farm-fresh red potatoes (5lb bag)', 6.00, TRUE),
('Russet Potatoes - 5lb Bag', 'plant', 'potatoes', 'Farm-fresh russet potatoes (5lb bag)', 6.00, TRUE);

-- ============================================
-- PLANT PRODUCTS - SEASONAL VEGETABLES
-- ============================================

INSERT INTO dim_products (product_name, category, subcategory, description, unit_price, is_active) VALUES
('Seasonal Vegetable Box - Small', 'plant', 'seasonal_veg', 'Assorted seasonal vegetables from our farm (feeds 2-3)', 18.00, TRUE),
('Seasonal Vegetable Box - Large', 'plant', 'seasonal_veg', 'Assorted seasonal vegetables from our farm (feeds 4-6)', 32.00, TRUE);

-- ============================================
-- MERCH - APPAREL
-- ============================================

INSERT INTO dim_products (product_name, category, subcategory, size, description, unit_price, is_active) VALUES
('LMW Farm T-Shirt - Small', 'merch', 'apparel', 'S', 'Comfortable cotton t-shirt with farm logo', 25.00, TRUE),
('LMW Farm T-Shirt - Medium', 'merch', 'apparel', 'M', 'Comfortable cotton t-shirt with farm logo', 25.00, TRUE),
('LMW Farm T-Shirt - Large', 'merch', 'apparel', 'L', 'Comfortable cotton t-shirt with farm logo', 25.00, TRUE),
('LMW Farm T-Shirt - XL', 'merch', 'apparel', 'XL', 'Comfortable cotton t-shirt with farm logo', 25.00, TRUE),
('LMW Farm T-Shirt - XXL', 'merch', 'apparel', 'XXL', 'Comfortable cotton t-shirt with farm logo', 27.00, TRUE),

('LMW Farm Sweatshirt - Small', 'merch', 'apparel', 'S', 'Cozy sweatshirt with farm logo', 40.00, TRUE),
('LMW Farm Sweatshirt - Medium', 'merch', 'apparel', 'M', 'Cozy sweatshirt with farm logo', 40.00, TRUE),
('LMW Farm Sweatshirt - Large', 'merch', 'apparel', 'L', 'Cozy sweatshirt with farm logo', 40.00, TRUE),
('LMW Farm Sweatshirt - XL', 'merch', 'apparel', 'XL', 'Cozy sweatshirt with farm logo', 40.00, TRUE),
('LMW Farm Sweatshirt - XXL', 'merch', 'apparel', 'XXL', 'Cozy sweatshirt with farm logo', 42.00, TRUE),

('LMW Farm Hat', 'merch', 'apparel', NULL, 'Adjustable baseball cap with embroidered farm logo', 22.00, TRUE);

-- ============================================
-- MERCH - EGG HOLDERS
-- ============================================

INSERT INTO dim_products (product_name, category, subcategory, description, unit_price, is_active) VALUES
('Wooden Egg Holder - 12 count', 'merch', 'egg_holders', 'Handcrafted wooden egg holder for 1 dozen eggs', 20.00, TRUE),
('Wooden Egg Holder - 18 count', 'merch', 'egg_holders', 'Handcrafted wooden egg holder for 18 eggs', 28.00, TRUE),
('Wooden Egg Holder - 24 count', 'merch', 'egg_holders', 'Handcrafted wooden egg holder for 2 dozen eggs', 35.00, TRUE);

-- ============================================
-- MERCH - TOOLS
-- ============================================

INSERT INTO dim_products (product_name, category, subcategory, description, unit_price, is_active) VALUES
('Egg Scrubber', 'merch', 'tools', 'Natural bristle egg cleaning brush', 8.00, TRUE);

-- ============================================
-- MERCH - STICKERS
-- ============================================

INSERT INTO dim_products (product_name, category, subcategory, description, unit_price, is_active) VALUES
('LMW Farm Bumper Sticker', 'merch', 'stickers', 'Durable vinyl bumper sticker with farm logo', 5.00, TRUE);

