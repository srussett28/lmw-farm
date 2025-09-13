import streamlit as st
import pandas as pd
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta, time
import os
import base64
from typing import Optional
import plotly.graph_objects as go
import plotly.express as px

# Page configuration
st.set_page_config(
    page_title="LMW Farm - Fresh Farm Eggs",
    page_icon="🥚",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for farm aesthetic
st.markdown("""
<style>
   .stApp {
       background-color: #e6f3ff;  /* Soft baby blue background */
   }
   
   .main-header {
       font-size: 3.5em;
       color: #2e7d32;
       text-align: center;
       font-family: Georgia, serif;
       margin-bottom: 0.5em;
       text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
   }
   
   /* Add border to sidebar for contrast */
   section[data-testid="stSidebar"] {
       border-right: 3px solid #2c3e50 !important;
   }
   
   .css-1aumxhk {
       border-right: 3px solid #2c3e50 !important;
   }
   
   .stSidebar {
       border-right: 3px solid #2c3e50 !important;
   }
   
   .farm-story {
       background-color: #f8f6f0;
       padding: 20px;
       border-radius: 10px;
       border-left: 5px solid #8B4513;
       margin: 20px 0;
   }
   
   .product-card {
       background-color: white;
       padding: 20px;
       border-radius: 10px;
       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
       margin: 15px 0;
       border: 2px solid #e8f5e8;
   }
   
   .inventory-status {
       background-color: #e8f5e8;
       padding: 15px;
       border-radius: 8px;
       border-left: 4px solid #4CAF50;
       margin: 10px 0;
   }
   
   .warning-box {
       background-color: #fff3cd;
       padding: 15px;
       border-radius: 8px;
       border-left: 4px solid #ffc107;
       margin: 10px 0;
   }
   
   .success-box {
       background-color: #d4edda;
       padding: 15px;
       border-radius: 8px;
       border-left: 4px solid #28a745;
       margin: 10px 0;
   }
   
   /* Center images without breaking layout */
   .stImage > div {
       display: flex !important;
       justify-content: center !important;
   }
   
   /* More specific image centering */
   .stImage {
       text-align: center !important;
   }
   
   .stImage img {
       margin: 0 auto !important;
       display: block !important;
   }

   /* Center the banner text better */
   .stMarkdown h1,
   .stMarkdown h2 {
       text-align: center !important;
   }
   /* Force image centering with more aggressive CSS */
.stImage {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
}

.stImage > div {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
}

.stImage img {
    display: block !important;
    margin-left: auto !important;
    margin-right: auto !important;
}
div[data-testid="column"] .stImage {
    display: flex !important;
    justify-content: center !important;
}
</style>
""", unsafe_allow_html=True)

# Database configuration
def init_database_connection():
    """Initialize database connection"""
    try:
        return psycopg2.connect(**st.secrets.postgres)
    except Exception as e:
        st.error("Database connection failed")
        return None

# Utility functions
def get_current_inventory():
    """Get current egg inventory"""
    conn = init_database_connection()
    if not conn:
        return 0, datetime.now()
    
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                SELECT current_stock, updated_date 
                FROM products 
                WHERE sku = 'EGG-DOZ-001'
            """)
            result = cur.fetchone()
            if result:
                return result['current_stock'], result['updated_date']
            return 0, datetime.now()
    except Exception as e:
        st.error(f"Error fetching inventory: {e}")
        return 0, datetime.now()
    finally:
        conn.close()
        
def get_chick_inventory():
    """Get current chick inventory from database"""
    conn = init_database_connection()
    if not conn:
        return 0, datetime.now()
    
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Sum up all chick products (category_id = 2)
            cur.execute("""
                SELECT SUM(current_stock) as total_stock, MAX(updated_date) as last_updated
                FROM products 
                WHERE category_id = 2 AND is_active = true
            """)
            result = cur.fetchone()
            if result and result['total_stock']:
                return result['total_stock'], result['last_updated'] or datetime.now()
            return 0, datetime.now()
    except Exception as e:
        st.error(f"Error fetching chick inventory: {e}")
        return 0, datetime.now()
    finally:
        conn.close()

def update_inventory(new_stock, notes="Manual update"):
    """Update egg inventory"""
    conn = init_database_connection()
    if not conn:
        return False
    
    try:
        with conn.cursor() as cur:
            # Get current stock for transaction log
            cur.execute("SELECT current_stock FROM products WHERE sku = 'EGG-DOZ-001'")
            old_stock = cur.fetchone()[0]
            
            # Update inventory
            cur.execute("""
                UPDATE products 
                SET current_stock = %s, updated_date = %s 
                WHERE sku = 'EGG-DOZ-001'
            """, (new_stock, datetime.now()))
            
            # Log transaction
            cur.execute("""
                INSERT INTO inventory_transactions 
                (product_id, transaction_type, quantity_change, previous_stock, new_stock, notes)
                VALUES ((SELECT id FROM products WHERE sku = 'EGG-DOZ-001'), 
                        'adjustment', %s, %s, %s, %s)
            """, (new_stock - old_stock, old_stock, new_stock, notes))
            
            conn.commit()
            return True
    except Exception as e:
        conn.rollback()
        st.error(f"Error updating inventory: {e}")
        return False
    finally:
        conn.close()

def get_pickup_options():
    """Get available pickup options"""
    return {
        "farmers_market": {
            "name": "Farmers Market",
            "description": "Saturday 3:00 PM - 6:00 PM",
            "location": "Local Farmers Market",
            "fee": 0.00
        },
        "farm_pickup": {
            "name": "Farm Pickup",
            "description": "By appointment (24hr notice)",
            "location": "LMW Farm",
            "fee": 0.00
        },
        "locker_downtown": {
            "name": "Downtown Locker",
            "description": "24/7 access with code",
            "location": "Downtown Business District",
            "fee": 0.50
        },
        "locker_shopping": {
            "name": "Shopping Center Locker",
            "description": "24/7 access with code",
            "location": "Main Shopping Center",
            "fee": 0.50
        }
    }

# Main app navigation
def main():
    # Sidebar navigation
    st.sidebar.markdown("# 🥚 LMW Farm ")
    st.sidebar.markdown("*Fresh. Local. Family.*")
    
    page = st.sidebar.selectbox("Navigate", [
        "🏠 Home & Our Story",
        "🥚 Order Fresh Eggs", 
        "📦 Subscription Service",
        "🐔 Our Chickens & Breeds",
        "📍 Pickup Locations",
        "📞 Contact Us",
        "🔐 Admin Panel"
    ])
    
    update_sidebar_inventory()
    
    # Page routing
    if page == "🏠 Home & Our Story":
        show_home_page()
    elif page == "🥚 Order Fresh Eggs":
        show_order_page()
    elif page == "📦 Subscription Service":
        show_subscription_page()
    elif page == "🐔 Our Chickens & Breeds":
        show_chickens_page()
    elif page == "📍 Pickup Locations":
        show_pickup_locations()
    elif page == "📞 Contact Us":
        show_contact_page()
    elif page == "🔐 Admin Panel":
        show_admin_panel()

def show_home_page():
    """Enhanced home page with visual appeal and engagement"""
    
    # Hero section with logo and family photo
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        # Banner ABOVE the image - BIGGER and more prominent
        st.markdown(
            '<div style="text-align: center; font-size: 4.2em; color: #2e7d32; font-family: Georgia, serif; font-weight: bold; text-shadow: 3px 3px 6px rgba(0,0,0,0.3); margin-bottom: 20px; white-space: nowrap;">Welcome to LMW Farm</div>',
            unsafe_allow_html=True
        )
        
        # Add veteran-owned subtitle
        st.markdown(
            '<div style="text-align: center; font-size: 1.4em; color: #1976d2; font-family: Georgia, serif; font-weight: bold; margin-bottom: 20px; text-shadow: 1px 1px 3px rgba(0,0,0,0.2);">Proudly Veteran Owned & Operated</div>',
            unsafe_allow_html=True
        )
        
        # Farm logo - bigger and centered
        try:
            st.image("pictures/Updatedlogo.png", use_container_width=True)
        except:
            st.markdown("🥚🐔")  # Fallback if image not found
        
        # Updated tagline to include both products
        st.markdown(
            '<div style="text-align: center; font-size: 2.3em; color: #000000; font-style: italic; margin-top: 20px;">Fresh Farm Eggs & Premium Baby Chicks</div>',
            unsafe_allow_html=True
        )
    
    # Two-column layout for products
    col1, col2 = st.columns(2)
    
    with col1:
        # Existing egg availability section
        current_stock, last_updated = get_current_inventory()
        
        if current_stock > 0:
            st.markdown(f"""
            <div style="background: linear-gradient(135deg, #e8f5e8, #f0fff0);
                         border: 3px solid #4CAF50; border-radius: 15px;
                         padding: 20px; text-align: center; margin: 20px 0;
                         box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h2 style="color: #2e7d32; margin: 0;">🥚 {current_stock} Dozen Available!</h2>
                <p style="color: #388e3c; font-size: 1.1em; margin: 10px 0;">
                    Fresh eggs collected this morning
                </p>
            </div>
            """, unsafe_allow_html=True)
            
            if st.button("🛒 Order Fresh Eggs", type="primary", use_container_width=True):
                st.switch_page("🥚 Order Fresh Eggs")
        else:
            st.markdown("""
            <div style="background: linear-gradient(135deg, #ffe6e6, #fff0f0);
                         border: 3px solid #ff4444; border-radius: 15px;
                         padding: 20px; text-align: center; margin: 20px 0;
                         box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h2 style="color: #c62828; margin: 0;">🥚 Eggs Sold Out</h2>
                <p style="color: #d32f2f; font-size: 1.1em; margin: 10px 0;">
                    Check back tomorrow!
                </p>
            </div>
            """, unsafe_allow_html=True)
    
    with col2:
        # New chicks availability section
        # You'll need a similar function for chick inventory
        # chick_availability = get_chick_availability()  # You'll create this
        
        st.markdown("""
        <div style="background: linear-gradient(135deg, #fff3e0, #fef7f0);
                     border: 3px solid #ff9800; border-radius: 15px;
                     padding: 20px; text-align: center; margin: 20px 0;
                     box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #e65100; margin: 0;">🐣 Baby Chicks Available!</h2>
            <p style="color: #f57c00; font-size: 1.1em; margin: 10px 0;">
                4 premium breeds ready for their new homes
            </p>
        </div>
        """, unsafe_allow_html=True)
        
        if st.button("🐣 Browse Baby Chicks", type="secondary", use_container_width=True):
            st.switch_page("🥚 Order Fresh Eggs")  # Will need to update page name to "Farm Products"
    
    st.markdown('<hr style="border: 1px solid #ccc; margin: 30px 0;">', unsafe_allow_html=True)
    
    # Family photo and story section
    col1, col2 = st.columns([1.7, 1.3])
    
    with col1:
        try:
            st.image("pictures/LMWFam.JPG", caption="The LMW Farm Family", use_container_width=True)
        except:
            st.info("📸 Family photo coming soon!")
    
    with col2:
     st.markdown("# 🌾 Our Story")
     st.markdown("""
    **We walked away from everything the world said we should want.**
    
    Six-figure salaries. Corporate success. Comfort. The "American Dream." But something was missing.
    
    **This land calls to us.** 
    
    For generations of my family farmed these Vermont land, and that 
    heritage runs deeper than any paycheck. When we looked at our three daughters Lundyn, Marlow, 
    and Winnie (LMW) we knew we wanted to give them something more valuable than money.
    
    **We wanted to give them purpose.**
    
    Every morning at dawn, we're out there. Not because we have to, but because these birds depend 
    on us. Because this land trusts us. Because teaching our girls that real wealth comes from 
    caring for something bigger than yourself .
    
    **Our promise is simple:** 
    
    Happy chickens lay better eggs. Period. No shortcuts, no compromises, 
    no corporate BS. Just honest work, honest food, and an honest living.
    
    *This isn't just our business. It's our family's legacy.*
    """)
    
    st.markdown('<hr style="border: 1px solid #ccc; margin: 30px 0;">', unsafe_allow_html=True)
    
    # Farm operations metrics with visual appeal
    st.markdown("## 🐔 Our Growing Operation")
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(
            label="🐔 Current Chickens",
            value="107",
            delta="Various stages",
            help="Our flock includes layers and future layers at different stages of development"
        )
    
    with col2:
        st.metric(
            label="🎯 2025 Goal",
            value="100+",
            delta="Egg layers",
            help="Our target for consistent daily egg production"
        )
    
    with col3:
        st.metric(
            label="🏞️ Space per Chicken",
            value="10+ sq ft",
            delta="On Pasture",
            help="Far exceeding industry standards for chicken welfare"
        )
    
    with col4:
        st.metric(
            label="⏰ Collection Times",
            value="3x daily",
            delta="Maximum freshness",
            help="Morning, afternoon, and evening collection ensures freshness"
        )
    
    st.markdown('<hr style="border: 1px solid #ccc; margin: 30px 0;">', unsafe_allow_html=True)
    
    # Quality promise with visual elements
    st.markdown("## 🏆 Our Quality Promise")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        #### 🥚 **Grade AA Quality Only**
        We grade using NC state standards for the highest quality.
        
        #### 🌈 **Rainbow Dozens Availabl in 2026**
        Blue, brown, green, white, and marans colored eggs from our heritage breeds.
        
        #### 📅 **Maximum Freshness**
        Eggs are never more than days old when sold - most are collected the same day!
        """)
    
    with col2:
        st.markdown("""
        #### 🐔 **Happy Chickens**
        10+ square feet per bird, free-range grazing from sun up to sun down.
        
        #### 🌱 **Natural Supplement**
        Chickens graze naturally with feed only as supplement, no antibiotics or hormones.
        
        #### 🔍 **Candled & Inspected**
        Every egg is individually checked for quality before reaching your table.In the future we are developing a candling machine that will automate the cleaning/candling and sorting process.
        """)
    
    # Photo gallery placeholder for Lundyn's photos
    st.markdown("---")
    st.markdown("## 📸 Life on the Farm")
    
    # Placeholder for farm photos - will be updated when Lundyn's photos are available
    col1, col2, col3 = st.columns(3)
    with col1:
        st.info("🐔 **Chicken Photos**\n*Coming soon from Lundyn's photography!*")
    with col2:
        st.info("🥚 **Egg Collection**\n*Daily collection process*")
    with col3:
        st.info("🏡 **Farm Life**\n*Behind the scenes*")
    
    st.markdown("---")
    
    # Call to action section
    st.markdown("## 🛒 Ready to Experience Farm-Fresh Eggs?")
    
    col1, col2, col3 = st.columns([1, 1, 1])
    
    with col1:
        if st.button("🥚 Order Fresh Eggs", type="primary", use_container_width=True):
            st.switch_page("🥚 Order Fresh Eggs")
    
    with col2:
        if st.button("📦 Learn About Subscriptions", use_container_width=True):
            st.switch_page("📦 Subscription Service")
    
    with col3:
        if st.button("🐔 Meet Our Chickens", use_container_width=True):
            st.switch_page("🐔 Our Chickens & Breeds")
    
    # Contact information
    st.markdown("---")
    st.markdown("### 📞 Questions? We'd love to hear from you!")
    
    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown("**📧 Email:** info@lmwfarm.com")
    with col2:
        st.markdown("**📱 Phone:** (555) 123-EGGS")
    with col3:
        st.markdown("**📍 Location:** Mount Airy/Piedmont Traid, NC")
    
    # Footer with farm values
    st.markdown("---")
    st.markdown(
        """
        <div style="text-align: center; color: #666; font-style: italic; padding: 20px;">
        🌱 <strong>Fresh. Local. Family.</strong> 🌱<br>
        <em>Committed to quality, community, and caring for our land and animals.</em>
        </div>
        """, 
        unsafe_allow_html=True
    )

def show_order_page():
    """Order page for purchasing eggs and chicks"""
    st.markdown(
    '<div style="text-align: center; font-size: 4.2em; color: #2e7d32; font-family: Georgia, serif; font-weight: bold; text-shadow: 3px 3px 6px rgba(0,0,0,0.3); margin-bottom: 20px;">🥚🐣 Order Fresh Farm Products</div>',
    unsafe_allow_html=True)
    
    # Get inventory for both products
    egg_stock, egg_last_updated = get_current_inventory()  # Your existing function
    chick_stock, chick_last_updated = get_chick_inventory()  # New function
    
    # Check if completely sold out
    if egg_stock <= 0 and chick_stock <= 0:
        st.markdown('<div class="warning-box">', unsafe_allow_html=True)
        st.markdown("### Sorry, we're currently sold out of all products!")
        st.markdown("Check back soon for fresh eggs and chicks, or consider signing up for our subscription service.")
        st.markdown('</div>', unsafe_allow_html=True)
        return
    
    # Product selection
    st.markdown("## What would you like to order?")

# Show inventory status above tabs
    col1, col2 = st.columns(2)
    with col1:
     st.markdown(f"""
    <div style="background: white; padding: 20px; border-radius: 10px; 
                box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 15px 0; 
                border: 2px solid #e8f5e8; text-align: center;">
        <h3 style="color: #2e7d32; margin: 0;">🥚 Eggs Available</h3>
        <p style="font-size: 1.5em; font-weight: bold; color: #000; margin: 10px 0;">{egg_stock} dozen</p>
        <p style="color: #555; margin: 0;">$6.00 per dozen</p>
    </div>
    """, unsafe_allow_html=True)

    with col2:
     st.markdown(f"""
    <div style="background: white; padding: 20px; border-radius: 10px; 
                box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 15px 0; 
                border: 2px solid #fff3e0; text-align: center;">
        <h3 style="color: #e65100; margin: 0;">🐣 Chicks Available</h3>
        <p style="font-size: 1.5em; font-weight: bold; color: #000; margin: 10px 0;">{chick_stock} total</p>
        <p style="color: #555; margin: 0;">Multiple breeds - $5.00-$8.00 each</p>
    </div>
    """, unsafe_allow_html=True)

    
    # Create tabs for different products
    if egg_stock > 0 and chick_stock > 0:
        product_tabs = st.tabs(["🥚 Fresh Eggs", "🐣 Baby Chicks", "🛒 Mixed Order"])
        
        with product_tabs[0]:
            show_egg_ordering(egg_stock, egg_last_updated)
            
        with product_tabs[1]:
            show_chick_ordering(chick_stock, chick_last_updated)
            
        with product_tabs[2]:
            show_mixed_ordering(egg_stock, chick_stock, egg_last_updated, chick_last_updated)
            
    elif egg_stock > 0:
        st.info("🐣 Chicks are currently sold out - only eggs available")
        show_egg_ordering(egg_stock, egg_last_updated)
        
    elif chick_stock > 0:
        st.info("🥚 Eggs are currently sold out - only chicks available")
        show_chick_ordering(chick_stock, chick_last_updated)


# 3. ADD THESE NEW FUNCTIONS at the end of your script, before the main() call:

def show_egg_ordering(current_stock, last_updated):
    """Display egg ordering section - uses your existing form logic"""
    
    
    # Order form - this is basically your existing order form
    with st.form("egg_order_form"):
        col1, col2 = st.columns(2)
        
        with col1:
            customer_name = st.text_input("Your Name*", placeholder="Enter your full name")
            customer_email = st.text_input("Email Address*", placeholder="your.email@example.com")
            customer_phone = st.text_input("Phone Number*", placeholder="(123) 456-7890")
        
        with col2:
            quantity = st.selectbox(
                "How many dozen eggs?*",
                options=list(range(1, min(current_stock + 1, 11))),
                format_func=lambda x: f"{x} dozen (${x * 6.00:.2f})"
            )
            
            pickup_options = get_pickup_options()
            pickup_choice = st.selectbox(
                "Pickup Method*",
                options=list(pickup_options.keys()),
                format_func=lambda x: f"{pickup_options[x]['name']} - {pickup_options[x]['description']} (+${pickup_options[x]['fee']:.2f})"
            )
            
            payment_method = st.selectbox(
                "Payment Method*",
                ["Cash", "Venmo", "Other (specify in notes)"]
            )
        
        special_notes = st.text_area(
            "Special Instructions (optional)",
            placeholder="Any special requests, delivery instructions, or notes..."
        )
        
        # Order summary
        total_cost = quantity * 6.00 + pickup_options[pickup_choice]['fee']
        st.markdown(f"**Order Total: ${total_cost:.2f}**")
        
        submitted = st.form_submit_button("🛒 Place Egg Order", type="primary", use_container_width=True)
        
        if submitted:
            if not all([customer_name, customer_email, customer_phone]):
                st.error("Please fill in all required fields (marked with *)")
            else:
                # Order confirmation
                st.markdown('<div class="success-box">', unsafe_allow_html=True)
                st.markdown("### ✅ Egg Order Confirmed!")
                st.markdown(f"""
                **Order Details:**
                - Customer: {customer_name}
                - Product: {quantity} dozen eggs
                - Total: ${total_cost:.2f}
                - Pickup: {pickup_options[pickup_choice]['name']}
                - Payment: {payment_method}
                
                **What's Next:**
                We'll contact you within 2 hours to confirm pickup details and arrange payment.
                """)
                st.markdown('</div>', unsafe_allow_html=True)


def get_available_chick_breeds():
    """Get all available chick breeds with their details"""
    conn = init_database_connection()
    if not conn:
        return []
    
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                SELECT id, name, description, sku, current_stock, price
                FROM products 
                WHERE category_id = 2 AND is_active = true AND current_stock > 0
                ORDER BY name
            """)
            results = cur.fetchall()
            return [dict(result) for result in results]
    except Exception as e:
        st.error(f"Error fetching chick breeds: {e}")
        return []
    finally:
        conn.close()


def show_chick_ordering(current_stock, last_updated):
    """Display chick ordering section with breed selection"""

    
    # Get available breeds
    available_breeds = get_available_chick_breeds()
    
    if not available_breeds:
        st.warning("No chick breeds currently available.")
        return
    
    # Display available breeds
    st.markdown("### Available Breeds:")
    for breed in available_breeds:
        col1, col2, col3 = st.columns([2, 1, 1])
        with col1:
            st.markdown(f"**{breed['name']}** - {breed['description']}")
        with col2:
            st.markdown(f"${breed['price']:.2f} each")
        with col3:
            st.markdown(f"{breed['current_stock']} available")
    
    
    # Order form
    with st.form("chick_order_form"):
        col1, col2 = st.columns(2)
        
        with col1:
            customer_name = st.text_input("Your Name*", placeholder="Enter your full name")
            customer_email = st.text_input("Email Address*", placeholder="your.email@example.com")
            customer_phone = st.text_input("Phone Number*", placeholder="(123) 456-7890")
        
        with col2:
            # Breed selection
            breed_options = {breed['sku']: f"{breed['name']} - ${breed['price']:.2f}" for breed in available_breeds}
            selected_breed_sku = st.selectbox(
                "Select Breed*",
                options=list(breed_options.keys()),
                format_func=lambda x: breed_options[x]
            )
            
            # Find selected breed details
            selected_breed = next(breed for breed in available_breeds if breed['sku'] == selected_breed_sku)
            
            quantity = st.selectbox(
                "How many chicks?*",
                options=list(range(1, min(selected_breed['current_stock'] + 1, 21))),
                format_func=lambda x: f"{x} chicks (${x * float(selected_breed['price']):.2f})"
            )
            
            pickup_options = get_pickup_options()
            pickup_choice = st.selectbox(
                "Pickup Method*",
                options=list(pickup_options.keys()),
                format_func=lambda x: f"{pickup_options[x]['name']} - {pickup_options[x]['description']} (+${pickup_options[x]['fee']:.2f})"
            )
            
            payment_method = st.selectbox(
                "Payment Method*",
                ["Cash", "Venmo", "Other (specify in notes)"]
            )
        
        special_notes = st.text_area(
            "Special Instructions (optional)",
            placeholder="Care questions, setup advice, or other notes..."
        )
        
        # Important chick care info
        st.markdown("**⚠️ Important:** Chicks need heat, food, and water immediately upon pickup. Please ensure you have proper brooder setup ready.")
        
        # Order summary
        total_cost = quantity * float(selected_breed['price']) + pickup_options[pickup_choice]['fee']
        st.markdown(f"**Order Total: ${total_cost:.2f}**")
        
        submitted = st.form_submit_button("🛒 Place Chick Order", type="primary", use_container_width=True)
        
        if submitted:
            if not all([customer_name, customer_email, customer_phone]):
                st.error("Please fill in all required fields (marked with *)")
            else:
                # Order confirmation
                st.markdown('<div class="success-box">', unsafe_allow_html=True)
                st.markdown("### ✅ Chick Order Confirmed!")
                st.markdown(f"""
                **Order Details:**
                - Customer: {customer_name}
                - Product: {quantity} {selected_breed['name']}
                - Total: ${total_cost:.2f}
                - Pickup: {pickup_options[pickup_choice]['name']}
                - Payment: {payment_method}
                
                **What's Next:**
                We'll contact you within 2 hours to confirm pickup details and arrange payment.
                
                **Remember:** Have your brooder setup ready with heat, food, and water!
                """)
                st.markdown('</div>', unsafe_allow_html=True)


def show_mixed_ordering(egg_stock, chick_stock, egg_last_updated, chick_last_updated):
    """Display mixed product ordering section"""
    st.markdown("### Order both eggs and chicks together")
    
    
    # Get available breeds for mixed order
    available_breeds = get_available_chick_breeds()
    
    # Mixed order form
    with st.form("mixed_order_form"):
        st.markdown("#### Customer Information")
        col1, col2 = st.columns(2)
        
        with col1:
            customer_name = st.text_input("Your Name*", placeholder="Enter your full name")
            customer_email = st.text_input("Email Address*", placeholder="your.email@example.com")
            customer_phone = st.text_input("Phone Number*", placeholder="(123) 456-7890")
        
        with col2:
            pickup_options = get_pickup_options()
            pickup_choice = st.selectbox(
                "Pickup Method*",
                options=list(pickup_options.keys()),
                format_func=lambda x: f"{pickup_options[x]['name']} - {pickup_options[x]['description']} (+${pickup_options[x]['fee']:.2f})"
            )
            
            payment_method = st.selectbox(
                "Payment Method*",
                ["Cash", "Venmo", "Other (specify in notes)"]
            )
        
        st.markdown("#### Product Selection")
        col3, col4 = st.columns(2)
        
        with col3:
            st.markdown("**🥚 Eggs**")
            egg_quantity = st.selectbox(
                "Dozen eggs",
                options=list(range(0, min(egg_stock + 1, 11))),
                format_func=lambda x: f"{x} dozen" if x > 0 else "None"
            )
        
        with col4:
            st.markdown("**🐣 Chicks**")
            if available_breeds:
                chick_breed_sku = st.selectbox(
                    "Chick breed (optional)",
                    options=["none"] + [breed['sku'] for breed in available_breeds],
                    format_func=lambda x: "No chicks" if x == "none" else next(breed['name'] for breed in available_breeds if breed['sku'] == x)
                )
                
                if chick_breed_sku != "none":
                    selected_chick_breed = next(breed for breed in available_breeds if breed['sku'] == chick_breed_sku)
                    chick_quantity = st.selectbox(
                        f"How many {selected_chick_breed['name']}?",
                        options=list(range(1, min(selected_chick_breed['current_stock'] + 1, 21))),
                        format_func=lambda x: f"{x} chicks (${x * float(selected_chick_breed['price']):.2f})"
                    )
                else:
                    chick_quantity = 0
                    selected_chick_breed = None
            else:
                st.info("No chick breeds currently available")
                chick_quantity = 0
                selected_chick_breed = None
        
        special_notes = st.text_area(
            "Special Instructions (optional)",
            placeholder="Any special requests, breed preferences, delivery instructions, or notes..."
        )
        
        # Order validation and summary
        if egg_quantity == 0 and chick_quantity == 0:
            st.error("Please select at least one product to order.")
        else:
            # Calculate costs
            egg_cost = egg_quantity * 6.00
            chick_cost = chick_quantity * float(selected_chick_breed['price']) if selected_chick_breed else 0
            pickup_fee = pickup_options[pickup_choice]['fee']
            total_cost = egg_cost + chick_cost + pickup_fee
            
            st.markdown("#### Order Summary")
            if egg_quantity > 0:
                st.markdown(f"- {egg_quantity} dozen eggs: ${egg_cost:.2f}")
            if chick_quantity > 0 and selected_chick_breed:
                st.markdown(f"- {chick_quantity} {selected_chick_breed['name']}: ${chick_cost:.2f}")
            st.markdown(f"- Pickup fee: ${pickup_fee:.2f}")
            st.markdown(f"**Total: ${total_cost:.2f}**")
            
            if chick_quantity > 0:
                st.markdown("**⚠️ Important:** Chicks need heat, food, and water immediately upon pickup.")
        
        submitted = st.form_submit_button("🛒 Place Mixed Order", type="primary", use_container_width=True)
        
        if submitted and (egg_quantity > 0 or chick_quantity > 0):
            if not all([customer_name, customer_email, customer_phone]):
                st.error("Please fill in all required fields (marked with *)")
            else:
                # Order confirmation
                st.markdown('<div class="success-box">', unsafe_allow_html=True)
                st.markdown("### ✅ Mixed Order Confirmed!")
                
                order_details = f"""
                **Order Details:**
                - Customer: {customer_name}
                """
                
                if egg_quantity > 0:
                    order_details += f"- Eggs: {egg_quantity} dozen (${egg_cost:.2f})\n"
                if chick_quantity > 0 and selected_chick_breed:
                    order_details += f"- Chicks: {chick_quantity} {selected_chick_breed['name']} (${chick_cost:.2f})\n"
                
                order_details += f"""- Total: ${total_cost:.2f}
                - Pickup: {pickup_options[pickup_choice]['name']}
                - Payment: {payment_method}
                
                **What's Next:**
                We'll contact you within 2 hours to confirm pickup details and arrange payment.
                """
                
                if chick_quantity > 0:
                    order_details += "\n**Remember:** Have your brooder setup ready with heat, food, and water!"
                
                st.markdown(order_details)
                st.markdown('</div>', unsafe_allow_html=True)


# 4. REPLACE your sidebar inventory section in main() function with this:

# In your main() function, replace the current sidebar inventory section with:
def update_sidebar_inventory():
    """Update the sidebar with current inventory for both eggs and chicks"""
    # Get inventory for both products
    egg_stock, egg_last_updated = get_current_inventory()
    chick_stock, chick_last_updated = get_chick_inventory()
    
    st.sidebar.markdown("---")
    st.sidebar.markdown("### 📊 Current Availability")
    
    # Eggs
    if egg_stock > 0:
        st.sidebar.success(f"🥚 **{egg_stock} dozen eggs**")
        egg_hours_ago = (datetime.now() - egg_last_updated).total_seconds() / 3600
        if egg_hours_ago > 24:
            st.sidebar.warning(f"⚠️ Eggs updated {egg_hours_ago:.1f} hours ago")
    else:
        st.sidebar.error("🥚 **Eggs sold out**")
    
    # Chicks  
    if chick_stock > 0:
        st.sidebar.success(f"🐣 **{chick_stock} chicks**")
        chick_hours_ago = (datetime.now() - chick_last_updated).total_seconds() / 3600
        if chick_hours_ago > 24:
            st.sidebar.warning(f"⚠️ Chicks updated {chick_hours_ago:.1f} hours ago")
    else:
        st.sidebar.error("🐣 **Chicks sold out**")
    
    if egg_stock == 0 and chick_stock == 0:
        st.sidebar.info("Check back tomorrow for fresh products!")



def show_subscription_page():
    """Subscription service marketing and signup"""
    st.markdown(
    '<div style="text-align: center; font-size: 4.2em; color: #2e7d32; font-family: Georgia, serif; font-weight: bold; text-shadow: 3px 3px 6px rgba(0,0,0,0.3); margin-bottom: 20px;">📦 Egg Subscription Service</div>',
    unsafe_allow_html=True
)
    st.markdown("## Never run out of fresh farm eggs again!")
    
    # Benefits section
    col1, col2 = st.columns([2,2])

    
    with col1:
     st.markdown("""
    <div style="background: linear-gradient(135deg, #e8f5e8, #f0fff0);
                 padding: 20px; border-radius: 10px; margin: 0px 0 15px 0;
                 border-left: 5px solid #4CAF50; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                 height: 535px; overflow: auto; display: flex; flex-direction: column; justify-content: center;">
        <h3>🥚 Subscription Benefits</h3>
        <p>✅ <strong>Guaranteed Weekly Supply</strong> - Never worry about sold out signs</p>
        <p>✅ <strong>Subscriber Discount</strong> - Retail Price $6.00 dozen and the Subscription Price is $5.50/dozen with further discounts for larger orders</p>
        <p>✅ <strong>Convenient Delivery</strong> - Subscription users will eventually have access to our delivery or locker service</p>
        <p>✅ <strong>Flexible Plans</strong> - Choose your quantity and frequency</p>
        <p>✅ <strong>Priority Access</strong> - First choice on rainbow dozens and seasonal specials</p>
        <p>✅ <strong>Support Local Farm</strong> - Help us grow and serve the community better</p>
    </div>
    """, unsafe_allow_html=True)
    
    with col2:
     st.image("pictures/eggs.jpeg", use_container_width=True)
    
    # Pricing
    st.markdown("---")
    st.markdown("## Subscription Plans")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
    <div style="background: white; padding: 20px; border-radius: 10px; 
                box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 15px 0; 
                border: 2px solid #e8f5e8;">
        <h3>📦 Weekly Plan</h3>
        <p><strong>$5.50 per dozen</strong></p>
        <ul>
            <li>Minimum 2 dozen per week</li>
            <li>Delivered every week</li>
            <li>Save $1.00 per dozen</li>
            <li>Cancel anytime</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)

    
    with col2:
         st.markdown("""
    <div style="background: white; padding: 20px; border-radius: 10px; 
                box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 15px 0; 
                border: 2px solid #e8f5e8;">
        <h3>📦 Bi-Weekly Plan</h3>
        <p><strong>$5.50 per dozen</strong></p>
        <ul>
            <li>Minimum 2 dozen per week</li>
            <li>Delivered every 2 weeks</li>
            <li>Perfect for smaller families</li>
            <li>Cancel anytime</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)
        
    with col3:
         st.markdown("""
    <div style="background: white; padding: 20px; border-radius: 10px; 
                box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 15px 0; 
                border: 2px solid #e8f5e8;">
        <h3>📦 Custom Plan</h3>
        <p><strong>$5.50 per dozen, after 4 dozen $5.00</strong></p>
        <ul>
            <li>Choose your quantity</li>
            <li>Choose your frequency</li>
            <li>Save Seasonal adjustments</li>
            <li>Cancel anytime</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)
       
    
    # Interest form
    st.markdown("---")
    st.markdown("## Express Your Interest")
    st.markdown("*Subscription service launching soon! Sign up to be notified when it's available.*")
    
    with st.form("subscription_interest"):
        col1, col2 = st.columns(2)
        
        with col1:
            name = st.text_input("Your Name")
            email = st.text_input("Email Address")
            phone = st.text_input("Phone Number")
        
        with col2:
            preferred_plan = st.selectbox("Preferred Plan", ["Weekly", "Bi-Weekly", "Custom"])
            dozen_per_delivery = st.selectbox("Dozen per delivery", [2, 3, 4, 5, 6, "More than 6"])
            delivery_area = st.text_input("Preferred delivery area/location")
        
        notes = st.text_area("Questions or special requests")
        
        if st.form_submit_button("🔔 Notify Me When Available", type="primary"):
            st.success("✅ Thank you for your interest! We'll contact you as soon as subscription service launches.")

def show_chickens_page():
    """Interactive information about chicken breeds and farm operations"""

# With this styled version:
    st.markdown(
    '<div style="text-align: center; font-size: 4.2em; color: #2e7d32; font-family: Georgia, serif; font-weight: bold; text-shadow: 3px 3px 6px rgba(0,0,0,0.3); margin-bottom: 20px;">🐔 Our Chickens & Breeds</div>',
    unsafe_allow_html=True
)
    st.info("📸 **Photo Section:** Lundyn's photos of different chicken breeds go here!")
    
    # Breed data with detailed information
    breed_data = {
        "egg_layers": {
            "Australorps": {
                "count": 12,
                "egg_color": "Brown",
                "temperament": "Docile",
                "image_path": "pictures/australorp.jpg",
                "description": "Known as one of the world's best laying breeds, Australorps are calm, friendly birds that consistently produce large brown eggs. They're excellent foragers and handle confinement well.",
                "why_chosen": "We chose Australorps for their incredible laying ability and gentle nature around our daughters. They're perfect for families and produce beautiful, consistent brown eggs.",
                "special_notes": "Excellent layers, can lay 250+ eggs per year"
            },
            "Rhode Island Reds": {
                "count": 10,
                "egg_color": "Brown",
                "temperament": "Hardy",
                "image_path": "pictures/reds.jpg",
                "description": "Classic American breed known for excellent egg production and hardiness. These reliable birds are excellent foragers and consistently productive layers.",
                "why_chosen": "These are the backbone of our brown egg production. Reliable, hardy, and consistently productive - exactly what a farm needs.",
                "special_notes": "Great foragers, consistent production"
            },
            "Golden Comets": {
                "count": 8,
                "egg_color": "Brown",
                "temperament": "Friendly",
                "image_path": "pictures/comet.jpg",
                "description": "A hybrid breed developed for commercial egg production. Known for their exceptional laying ability and friendly disposition.",
                "why_chosen": "These girls are egg-laying machines! They start laying early and produce consistently throughout the year.",
                "special_notes": "Early layers, high production"
            },
            "Olive Eggers": {
                "count": 6,
                "egg_color": "Olive Green",
                "temperament": "Calm",
                "image_path": "pictures/eggers.jpg",
                "description": "A hybrid breed created by crossing dark brown egg layers with blue egg layers, resulting in beautiful olive-colored eggs. Calm, productive layers.",
                "why_chosen": "The olive green eggs are incredible for our rainbow dozens. Customers are always amazed by the unique color.",
                "special_notes": "Unique olive green eggs, great for rainbow dozens"
            },
            "Starlight Green Eggers": {
                "count": 5,
                "egg_color": "Green",
                "temperament": "Friendly",
                "image_path": "pictures/starlight.jpg",
                "description": "A newer breed development that consistently lays green eggs. Friendly, productive birds that add beautiful color variety to egg collections.",
                "why_chosen": "Another green egg variety that helps us create those stunning rainbow dozen collections that customers love.",
                "special_notes": "Rare green eggs, consistent layers"
            },
            "Jersey Giants": {
                "count": 4,
                "egg_color": "Brown",
                "temperament": "Gentle",
                "image_path": "pictures/jerseys.jpg",
                "description": "America's largest chicken breed! These gentle giants are calm, friendly birds that lay large brown eggs. Despite their size, they're excellent foragers.",
                "why_chosen": "The kids love these gentle giants! They're incredibly calm and their extra-large eggs are perfect for baking.",
                "special_notes": "Largest chicken breed, extra-large eggs"
            },
            "Sapphire Gems": {
                "count": 7,
                "egg_color": "Brown",
                "temperament": "Active",
                "image_path": "pictures/gems.jpg",
                "description": "A newer breed with beautiful blue-gray feathering. Active foragers that lay consistently and handle free-range life very well.",
                "why_chosen": "Their beautiful blue-gray coloring caught our eye, and they're excellent free-range birds that fit perfectly with our farming style.",
                "special_notes": "Beautiful blue-gray feathers, excellent foragers"
            },
            "Cinnamon Queens": {
                "count": 9,
                "egg_color": "Brown",
                "temperament": "Calm",
                "image_path": "pictures/queens.jpg",
                "description": "A hybrid breed known for exceptional egg production and beautiful reddish-brown feathering. Calm, productive birds that adapt well to various conditions.",
                "why_chosen": "Their cinnamon-colored feathers are gorgeous, and they're incredibly productive layers that handle our climate well.",
                "special_notes": "Beautiful cinnamon coloring, high production"
            },
            "Barred Rocks": {
                "count": 8,
                "egg_color": "Brown",
                "temperament": "Friendly",
                "image_path": "pictures/barredrock.jpg",
                "description": "Classic American breed known for their distinctive black and white striped feathers. Hardy, cold-resistant birds that are great for free-ranging.",
                "why_chosen": "These girls are tough as nails and handle our North Carolina weather beautifully. The kids love their distinctive 'barred' pattern.",
                "special_notes": "Cold hardy, great for beginners"
            },
            "Buff Orpington": {
                "count": 6,
                "egg_color": "Brown",
                "temperament": "Docile",
                "image_path": "pictures/BO.jpg",
                "description": "Known for their beautiful golden buff color and incredibly gentle nature. These fluffy birds are excellent mothers and consistent layers.",
                "why_chosen": "The most gentle, cuddly chickens you'll ever meet! The girls love holding these sweet birds, and they're great with children.",
                "special_notes": "Extremely gentle, great with kids"
            },
            "Midnight Majestics": {
                "count": 5,
                "egg_color": "Brown",
                "temperament": "Calm",
                "image_path": "pictures/majesty.jpg",
                "description": "A newer breed with striking dark plumage and excellent laying ability. Calm birds that adapt well to free-range environments.",
                "why_chosen": "Their dramatic dark feathers make them stand out in the flock, and they're reliable layers with great temperaments.",
                "special_notes": "Striking dark plumage, reliable layers"
            },
            "Black Sex Link": {
                "count": 7,
                "egg_color": "Brown",
                "temperament": "Active",
                "image_path": "pictures/bsl.jpg",
                "description": "A hybrid breed created by crossing specific breeds to create sex-linked chicks that can be sexed at hatching. Known for excellent egg production and hardiness.",
                "why_chosen": "These girls are incredibly productive layers and the sex-linking trait made them easier to manage as chicks. They're reliable brown egg producers.",
                "special_notes": "Sex-linked breed, excellent production"
            },
            "Zombies (Legbar/Ayam Mix)": {
                "count": 4,
                "egg_color": "Blue/Green",
                "temperament": "Unique",
                "image_path": "pictures/zombie.jpg",
                "description": "Our own designer mix combining Cream Legbar genetics with Ayam Cemani. These unique birds produce colorful eggs with interesting genetic combinations.",
                "why_chosen": "This is our experimental breeding project turned production layer. We're working on developing our own unique line with interesting egg colors and patterns.",
                "special_notes": "Our custom breeding project, unique genetics"
            },
            "Barnyard Mixes": {
                "count": 12,
                "egg_color": "Mixed",
                "temperament": "Varied",
                "image_path": "pictures/barnyard.jpg",
                "description": "Various mixed breed chickens that combine the best traits of multiple breeds. Each bird is unique with its own personality and egg characteristics.",
                "why_chosen": "These girls represent the best of all worlds - hybrid vigor, unique appearances, and surprise egg colors. They're our 'wild cards.'",
                "special_notes": "Hybrid vigor, unique combinations"
            }
        },
        "specialty_breeders": {
            "Black Copper Marans": {
                "count": 8,
                "egg_color": "Dark Brown/Chocolate",
                "temperament": "Calm",
                "image_path": "pictures/marans.jpg",
                "description": "French breed famous for laying the darkest brown eggs of any chicken breed. The eggs are so dark they're often called 'chocolate eggs.'",
                "why_chosen": "The chocolate-colored eggs are absolutely stunning and add incredible visual appeal to our rainbow dozens. Customers are blown away by how dark they are.",
                "special_notes": "Darkest brown eggs in the world"
            },
            "Americanas": {
                "count": 10,
                "egg_color": "Blue/Green",
                "temperament": "Gentle",
                "image_path": "pictures/jimbo.jpg",
                "description": "Often called 'Easter Eggers,' these friendly birds lay eggs in various shades of blue and green. Each hen's eggs are a slightly different shade.",
                "why_chosen": "The variety of blue and green shades makes every collection exciting. Perfect for our breeding program to maintain colorful egg genetics.",
                "special_notes": "Easter eggers, variety of blue/green shades"
            },
            "Barred Rock/Rustic Rock": {
                "count": 6,
                "egg_color": "Brown",
                "temperament": "Friendly",
                "image_path": "pictures/barredrock.jpg",
                "description": "Classic American breed selected for breeding purposes. These birds carry excellent genetics for hardiness, productivity, and temperament.",
                "why_chosen": "We're using these for our breeding program because of their proven genetics, hardiness, and excellent maternal instincts.",
                "special_notes": "Selected breeding stock, excellent mothers"
            },
            "Cream Legbars": {
                "count": 5,
                "egg_color": "Blue",
                "temperament": "Active",
                "image_path": "pictures/legbar.jpg",
                "description": "A rare auto-sexing breed that lays beautiful blue eggs. Active foragers with a distinctive crest, they're excellent free-range birds.",
                "why_chosen": "The blue eggs are stunning, and being auto-sexing makes breeding much easier. These are key to our blue egg genetics.",
                "special_notes": "Auto-sexing breed, rare blue eggs"
            }
        }
    }
    
    # Current flock summary
    total_layers = sum(breed["count"] for breed in breed_data["egg_layers"].values())
    total_breeders = sum(breed["count"] for breed in breed_data["specialty_breeders"].values())
    
    st.markdown(f"""
<div style="background: linear-gradient(135deg, #f5f5f5, #ffffff);
             border: 2px solid #ccc; border-radius: 15px;
             padding: 25px; margin: 30px 0;
             box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <h2 style="text-align: center; color: #333; font-size: 2.2em; margin-bottom: 20px;">
        Our Current Flock - {total_layers + total_breeders} Chickens
    </h2>
</div>
""", unsafe_allow_html=True)

    col1, col2 = st.columns(2)
    with col1:
     st.markdown(f"""
<div style="background: #e8f5e8; padding: 20px; border-radius: 10px; 
            border-left: 5px solid #4CAF50; margin: 10px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="color: #000; margin: 0; text-align: center;">🥚 Egg Layers</h3>
    <p style="font-size: 2.5em; font-weight: bold; color: #000; 
              text-align: center; margin: 10px 0;">{total_layers}</p>
    <p style="color: #555; text-align: center; margin: 0;">
        14 breeds producing fresh eggs daily
    </p>
</div>
""", unsafe_allow_html=True)

    with col2:
     st.markdown(f"""
    <div style="background: #fff3e0; padding: 20px; border-radius: 10px; 
                border-left: 5px solid #ff9800; margin: 10px 0;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3 style="color: #000; margin: 0; text-align: center;">🐣 Specialty Breeders</h3>
        <p style="font-size: 2.5em; font-weight: bold; color: #000; 
                  text-align: center; margin: 10px 0;">{total_breeders}</p>
        <p style="color: #555; text-align: center; margin: 0;">
            4 breeds for breeding & specialty eggs
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Interactive breed selection
    st.markdown("---")
    st.markdown("##  Meet Our Breeds")
    st.markdown("*Click on any breed below to learn more!*")
    
    # Create tabs for categories
    tab1, tab2 = st.tabs(["🥚 Egg Layers", "🐣 Specialty Breeders"])
    
    with tab1:
        st.markdown("### Our Production Layers")
        st.markdown("*These girls are our egg-laying superstars, providing fresh eggs daily.*")
        
        # Create breed buttons in a grid
        cols = st.columns(3)
        for i, (breed_name, breed_info) in enumerate(breed_data["egg_layers"].items()):
            with cols[i % 3]:
                if st.button(f"🐔 {breed_name}", key=f"layer_{breed_name}", use_container_width=True):
                    st.session_state.selected_breed = breed_name
                    st.session_state.selected_category = "egg_layers"
    
    with tab2:
        st.markdown("### Our Breeding & Specialty Birds")
        st.markdown("*These special birds help us develop new lines and provide unique egg colors.*")
        
        # Create breed buttons in a grid
        cols = st.columns(3)
        for i, (breed_name, breed_info) in enumerate(breed_data["specialty_breeders"].items()):
            with cols[i % 3]:
                if st.button(f"🐣 {breed_name}", key=f"breeder_{breed_name}", use_container_width=True):
                    st.session_state.selected_breed = breed_name
                    st.session_state.selected_category = "specialty_breeders"
    
    # Display selected breed details
    if hasattr(st.session_state, 'selected_breed') and hasattr(st.session_state, 'selected_category'):
        breed_name = st.session_state.selected_breed
        category = st.session_state.selected_category
        breed_info = breed_data[category][breed_name]
        
        st.markdown("---")
        
        # Breed detail section
        col1, col2 = st.columns([1, 2])
        
        with col1:
            # Actual breed photo
            try:
                st.image(breed_info["image_path"], caption=breed_name, use_container_width=True)
            except:
                # Fallback placeholder if image not found
                st.markdown(f"""
                <div style="background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
                             border: 2px solid #4a90e2; border-radius: 10px;
                             padding: 20px; text-align: center; margin: 10px 0;
                             min-height: 200px; display: flex; align-items: center; justify-content: center;">
                    <div>
                        <h3 style="color: #2c5282; margin: 10px 0;">📸</h3>
                        <p style="color: #4a90e2; margin: 5px 0;"><strong>{breed_name}</strong></p>
                        <p style="color: #666; font-size: 0.9em;">Photo coming soon!</p>
                    </div>
                </div>
                """, unsafe_allow_html=True)
        
        with col2:
            st.markdown(f"## 🐔 {breed_name}")
            
            # Key stats
            col_stats1, col_stats2, col_stats3 = st.columns(3)
            with col_stats1:
                st.metric("Count", breed_info["count"])
            with col_stats2:
                st.metric("Egg Color", breed_info["egg_color"])
            with col_stats3:
                st.metric("Temperament", breed_info["temperament"])
            
            # Description
            st.markdown("### About This Breed")
            st.markdown(breed_info["description"])
            
            # Why we chose them
            st.markdown("### Why We Chose Them")
            st.markdown(f"*{breed_info['why_chosen']}*")
            
            # Special notes
            st.markdown("### Special Notes")
            st.markdown(f"**{breed_info['special_notes']}**")
    
    else:
        st.markdown("---")
        st.info("👆 Click on any breed above to learn more about our chickens!")
    
    # Rest of the existing content (Growth Plans, Farm Practices, etc.)
    st.markdown("---")
    
# Growth plans section
    st.markdown("## 🚀 Growth Plans")

    col1, col2 = st.columns(2)

    with col1:
     st.markdown("### 2025 Goals")
     st.markdown("""
    - **100+ laying hens** for consistent daily production
    - **Chick sales launch** from our premium breeds  
    - **Rainbow dozens** featuring 6+ egg colors
    - **Farm tours** and educational visits
    """)

    with col2:
     st.markdown("### Long-term Vision (2026+)")
     st.markdown("""
    - **300 total chickens** (200 layers, 100 breeding)
    - **Year-round chick sales** from 4 specialty breeds
    - **Diversified farm** with honey, berries, cattle
    - **Regional distribution** across the Triad
    """)

# Farm practices section  
    st.markdown("---")
    st.markdown("## 🏡 Our Farming Philosophy")

    col1, col2, col3 = st.columns(3)

    with col1:
     st.markdown("### 🌿 Free-Range Life")
     st.markdown("**10+ square feet per bird** with natural grazing from sunrise to sunset. Supplemental feed only as needed.")

    with col2:
     st.markdown("### 🛡️ Health & Safety") 
     st.markdown("**Daily health checks**, clean coops, fresh water, and predator protection from Norman , Leroy and the Come At Me Bro's.")

    with col3:
     st.markdown("### ⭐ Quality Control")
     st.markdown("**3x daily collection**, individual candling and cleaning to NC state standards for Grade AA quality.")

    st.markdown("---")

def create_pickup_locations_map():
    """Create an interactive map showing LMW Farm pickup locations"""
    
    # Location data with coordinates (you may need to adjust these slightly)
    locations = [
        {
            'name': '🏡 LMW Farm',
            'lat': 36.4580,
            'lon': -80.6140,
            'category': 'farm',
            'address': '193 Caterpillar Trail, Mt Airy, NC',
            'status': 'Home Base',
            'details': 'Fresh eggs collected daily from our free-range chickens',
            'hours': 'Dawn to Dusk, 7 days a week',
            'distance': '0 miles',
            'color': '#8B4513',
            'size': 20
        },
        # Active Farmers Markets
        {
            'name': '🌾 Mount Airy Farmers Market',
            'lat': 36.4993,
            'lon': -80.6081,
            'category': 'active_market',
            'address': '232 W. Independence Blvd., Mount Airy, NC',
            'status': 'Active - Fridays',
            'details': 'Our primary Friday morning market location',
            'hours': 'Fridays 9:00 AM - 12:00 PM (April-September)',
            'distance': '4-7 miles from farm',
            'color': '#4CAF50',
            'size': 15
        },
        {
            'name': '🌾 Dobson Farmers Market',
            'lat': 36.3970,
            'lon': -80.7240,
            'category': 'active_market',
            'address': '903 East Atkins Street, Dobson, NC',
            'status': 'Active - Fridays',
            'details': 'Our Friday afternoon market location',
            'hours': 'Fridays 3:00 PM - 6:00 PM (May-September)',
            'distance': '12-15 miles from farm',
            'color': '#4CAF50',
            'size': 15
        },
        # Strategic Pickup Locations
        {
            'name': '🏬 Mayberry Mall',
            'lat': 36.5089,
            'lon': -80.6170,
            'category': 'pickup_location',
            'address': '388 Frederick Street, Mount Airy, NC',
            'status': 'Coming Soon',
            'details': 'Primary pickup hub serving five counties',
            'hours': 'TBD - Regional shopping center',
            'distance': '5-8 miles from farm',
            'color': '#2196F3',
            'size': 12
        },
        {
            'name': '📚 Mount Airy Public Library',
            'lat': 36.4889,
            'lon': -80.6070,
            'category': 'pickup_location',
            'address': '145 Rockford Street, Mount Airy, NC',
            'status': 'Coming Soon',
            'details': 'Downtown community gathering place',
            'hours': 'TBD - Library hours',
            'distance': '4-7 miles from farm',
            'color': '#2196F3',
            'size': 10
        },
        {
            'name': '🏔️ Pilot Mountain Library',
            'lat': 36.3856,
            'lon': -80.4700,
            'category': 'pickup_location',
            'address': '319 West Main Street, Pilot Mountain, NC',
            'status': 'Coming Soon',
            'details': 'Serving eastern Surry County',
            'hours': 'TBD - Library hours',
            'distance': '15-18 miles from farm',
            'color': '#2196F3',
            'size': 10
        },
        {
            'name': '🎓 Surry Community College',
            'lat': 36.3889,
            'lon': -80.4650,
            'category': 'pickup_location',
            'address': '612 East Main Street, Pilot Mountain, NC',
            'status': 'Coming Soon',
            'details': 'College campus with large parking area',
            'hours': 'TBD - Campus hours',
            'distance': '16-19 miles from farm',
            'color': '#2196F3',
            'size': 10
        },
        # Future Markets
        {
            'name': '🌾 King Farmers Market',
            'lat': 36.2789,
            'lon': -80.3589,
            'category': 'future_market',
            'address': '105 Moore Road, King, NC',
            'status': 'Future Expansion',
            'details': 'Wednesdays market serving Stokes County',
            'hours': 'Wednesdays 11:00 AM - 1:00 PM (April-October)',
            'distance': '25-28 miles from farm',
            'color': '#FF9800',
            'size': 8
        },
        {
            'name': '🌾 Elkin Farmers Market',
            'lat': 36.2448,
            'lon': -80.8509,
            'category': 'future_market',
            'address': '226 North Bridge Street, Elkin, NC',
            'status': 'Future Expansion',
            'details': '45+ vendors with covered space and live music',
            'hours': 'Saturdays 9:00 AM - 12:00 PM (April-TBD)',
            'distance': '20-23 miles from farm',
            'color': '#FF9800',
            'size': 8
        },
        {
            'name': '🌾 Pilot Mountain Market',
            'lat': 36.3856,
            'lon': -80.4700,
            'category': 'future_market',
            'address': '300 South Key Street, Pilot Mountain, NC',
            'status': 'Future Expansion',
            'details': 'Saturday afternoon market',
            'hours': 'Saturdays 3:00 PM - 6:00 PM (April-October)',
            'distance': '15-18 miles from farm',
            'color': '#FF9800',
            'size': 8
        }
    ]
    
    # Create the map
    fig = go.Figure()
    
    # Add markers for each location
    for location in locations:
        # Create hover text
        hover_text = f"""
        <b>{location['name']}</b><br>
        📍 {location['address']}<br>
        📏 {location['distance']}<br>
        ⏰ {location['hours']}<br>
        📋 {location['status']}<br>
        💡 {location['details']}
        """
        
        fig.add_trace(go.Scattermapbox(
            lat=[location['lat']],
            lon=[location['lon']],
            mode='markers',
            marker=dict(
                size=location['size'],
                color=location['color'],
                opacity=0.8
            ),
            text=location['name'],
            hovertemplate=hover_text + "<extra></extra>",
            name=location['status'],
            showlegend=False if location['category'] == 'farm' else True
        ))
    
    # Add coverage circles around the farm
    # 15-mile radius circle
    fig.add_trace(go.Scattermapbox(
        lat=[36.4580],
        lon=[-80.6140],
        mode='markers',
        marker=dict(size=0, opacity=0),
        name='15-mile radius',
        showlegend=False,
        hoverinfo='skip'
    ))
    
    # Update layout
    fig.update_layout(
        mapbox=dict(
            style="open-street-map",
            center=dict(lat=36.4580, lon=-80.6140),
            zoom=9.5
        ),
        height=500,
        margin=dict(l=0, r=0, t=30, b=0),
        title=dict(
            text="🗺️ LMW Farm Strategic Coverage Area",
            x=0.5,
            font=dict(size=18, color='#2e7d32', family='Georgia, serif')
        ),
        legend=dict(
            yanchor="top",
            y=0.99,
            xanchor="left",
            x=0.01,
            bgcolor="rgba(255,255,255,0.8)",
            bordercolor="rgba(0,0,0,0.2)",
            borderwidth=1
        )
    )
    
    return fig

# Updated pickup locations function with the interactive map
def show_pickup_locations():
    """Pickup location information with interactive map"""
    
    # Title with same styling as other pages
    st.markdown(
        '<div style="text-align: center; font-size: 4.2em; color: #2e7d32; font-family: Georgia, serif; font-weight: bold; text-shadow: 3px 3px 6px rgba(0,0,0,0.3); margin-bottom: 20px;">📍 Pickup Locations</div>',
        unsafe_allow_html=True
    )
    
    st.markdown("### Fresh eggs available through multiple convenient pickup options")
    
    # Interactive Map Section
    st.markdown("---")
    st.markdown("## 🗺️ Interactive Coverage Map")
    st.markdown("*Click and explore our strategic locations throughout Surry County*")
    
    # Create and display the interactive map
    map_fig = create_pickup_locations_map()
    st.plotly_chart(map_fig, use_container_width=True)
    
    # Map Legend
    st.markdown("""
    **🏡 Brown:** LMW Farm (Home Base)  
    **🟢 Green:** Active Farmers Markets (Fridays)  
    **🔵 Blue:** Strategic Pickup Locations (Coming Soon)  
    **🟠 Orange:** Future Market Expansion  
    """)
    
    # Strategic Pickup Locations Section
    st.markdown("---")
    st.markdown("## 🏪 Strategic Pickup Locations")
    st.markdown("*Convenient locations throughout Surry County - coming soon!*")
    
    # Create 2x2 grid for pickup locations
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        <div style="background: white; padding: 20px; border-radius: 10px; 
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 15px 0; 
                    border: 2px solid #e8f5e8;">
            <h3>🏬 Mayberry Mall (Primary Hub)</h3>
            <p><strong>Location:</strong> 388 Frederick Street, Mount Airy</p>
            <p><strong>Distance:</strong> 5-8 miles from farm</p>
            <p><strong>Why here:</strong> Regional mall serving five counties with excellent parking and visibility</p>
            <p>📸 <em>Photo placeholder - Mall exterior</em></p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("""
        <div style="background: white; padding: 20px; border-radius: 10px; 
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 15px 0; 
                    border: 2px solid #e8f5e8;">
            <h3>📚 Mount Airy Public Library</h3>
            <p><strong>Location:</strong> 145 Rockford Street, Mount Airy</p>
            <p><strong>Distance:</strong> 4-7 miles from farm</p>
            <p><strong>Why here:</strong> Downtown community gathering place with established foot traffic</p>
            <p>📸 <em>Photo placeholder - Library entrance</em></p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style="background: white; padding: 20px; border-radius: 10px; 
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 15px 0; 
                    border: 2px solid #e8f5e8;">
            <h3>🏔️ Charles H. Stone Memorial Library</h3>
            <p><strong>Location:</strong> 319 West Main Street, Pilot Mountain</p>
            <p><strong>Distance:</strong> 15-18 miles from farm</p>
            <p><strong>Why here:</strong> Main Street visibility serving eastern Surry County</p>
            <p>📸 <em>Photo placeholder - Pilot Mountain library</em></p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("""
        <div style="background: white; padding: 20px; border-radius: 10px; 
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 15px 0; 
                    border: 2px solid #e8f5e8;">
            <h3>🎓 Surry Community College - Pilot Center</h3>
            <p><strong>Location:</strong> 612 East Main Street, Pilot Mountain</p>
            <p><strong>Distance:</strong> 16-19 miles from farm</p>
            <p><strong>Why here:</strong> Large parking area and established community gathering point</p>
            <p>📸 <em>Photo placeholder - College entrance</em></p>
        </div>
        """, unsafe_allow_html=True)
    
    # Farmers Markets Section
    st.markdown("---")
    st.markdown("## 🌾 Farmers Markets")
    st.markdown("## Find us at these local farmers markets with fresh eggs every week!*")
     
    image_path = os.path.join("pictures", "Signage.jpg")
    
    with open(image_path, "rb") as img_file:
     img_base64 = base64.b64encode(img_file.read()).decode()

# Inject into HTML for centering and sizing
    st.markdown(
    f"""
    <div style="display: flex; justify-content: center;">
        <img src="data:image/jpeg;base64,{img_base64}" style="max-width:900px; width:100%; border-radius:12px;">
    </div>
    """,
    unsafe_allow_html=True
)
    
    # Active Markets
    st.markdown("### 🟢 Current Market Schedule")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        <div style="background: linear-gradient(135deg, #e8f5e8, #f0fff0); 
                    padding: 20px; border-radius: 10px; margin: 15px 0; 
                    border-left: 5px solid #4CAF50; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3>🥚 Mount Airy Farmers Market</h3>
            <p><strong>When:</strong> Fridays, 9:00 AM - 12:00 PM</p>
            <p><strong>Where:</strong> 232 W. Independence Blvd., Mount Airy</p>
            <p><strong>Season:</strong> April - September</p>
            <p><strong>Notes:</strong> Our primary Friday morning location</p>
            <p>📸 <em>Photo placeholder - Market setup</em></p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style="background: linear-gradient(135deg, #e8f5e8, #f0fff0); 
                    padding: 20px; border-radius: 10px; margin: 15px 0; 
                    border-left: 5px solid #4CAF50; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3>🥚 Dobson Farmers Market</h3>
            <p><strong>When:</strong> Fridays, 3:00 PM - 6:00 PM</p>
            <p><strong>Where:</strong> 903 East Atkins Street, Dobson</p>
            <p><strong>Season:</strong> May - September</p>
            <p><strong>Notes:</strong> Our Friday afternoon location</p>
            <p>📸 <em>Photo placeholder - Dobson market</em></p>
        </div>
        """, unsafe_allow_html=True)
    
    # Future Markets
    st.markdown("### 🔄 Expanding Market Presence")
    st.markdown("*As our flock grows, we plan to add these markets to our weekly schedule:*")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        <div style="background: #fff3e0; padding: 15px; border-radius: 10px; 
                    margin: 10px 0; border-left: 5px solid #ff9800;">
            <h4>King Farmers Market</h4>
            <p><strong>When:</strong> Wednesdays, 11 AM - 1 PM</p>
            <p><strong>Where:</strong> 105 Moore Road, King</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style="background: #fff3e0; padding: 15px; border-radius: 10px; 
                    margin: 10px 0; border-left: 5px solid #ff9800;">
            <h4>Elkin Farmers Market</h4>
            <p><strong>When:</strong> Saturdays, 9 AM - 12 PM</p>
            <p><strong>Where:</strong> 226 North Bridge Street, Elkin</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div style="background: #fff3e0; padding: 15px; border-radius: 10px; 
                    margin: 10px 0; border-left: 5px solid #ff9800;">
            <h4>Pilot Mountain Market</h4>
            <p><strong>When:</strong> Saturdays, 3 PM - 6 PM</p>
            <p><strong>Where:</strong> 300 South Key Street</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Future Vision Section
    st.markdown("---")
    st.markdown("## 🚀 Future Expansion")
    st.markdown("*Our vision for enhanced pickup convenience*")

    col1, col2 = st.columns(2)

    with col1:
        try:
            from PIL import Image
        # Load and resize the store image to uniform dimensions
            store_img = Image.open("pictures/store.jpg")
            store_resized = store_img.resize((400, 250))  # width=400, height=250
            st.image(store_resized, caption="Future farm store concept", use_container_width=True)
        except:
            st.info("📸 Store concept photo coming soon!")
    
    # Then the text content
        st.markdown("""
    <div style="background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
                 padding: 20px; border-radius: 10px; margin: 15px 0;
                 border-left: 5px solid #2196F3; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3>🏪 Coop Storefront</h3>
        <p>Planning a dedicated farm store location for:</p>
        <ul>
            <li>Fresh eggs daily</li>
            <li>Baby chicks (seasonal)</li>
            <li>Farm merchandise</li>
            <li>Local partnerships</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)

    with col2:
        try:
            from PIL import Image
        # Load and resize the locker image to the same uniform dimensions
            locker_img = Image.open("pictures/locker.jpg")
            locker_resized = locker_img.resize((400, 250))  # Same dimensions: width=400, height=250
            st.image(locker_resized, caption="Refrigerated locker system", use_container_width=True)
        except:
            st.info("📸 Locker system photo coming soon!")
    
    # Then the text content
        st.markdown("""
    <div style="background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
                 padding: 20px; border-radius: 10px; margin: 15px 0;
                 border-left: 5px solid #2196F3; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3>❄️ Refrigerated Lockers</h3>
        <p>24/7 pickup convenience with:</p>
        <ul>
            <li>Temperature-controlled storage</li>
            <li>Secure access codes</li>
            <li>Multiple neighborhood locations</li>
            <li>Online ordering integration</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)
    
    # Subscription-Based Delivery
    st.markdown("---")
    st.markdown("## 🚚 Subscription-Based Delivery")
    
    st.markdown("""
    <div style="background: linear-gradient(135deg, #fff8e1, #fffbf0); 
                 padding: 30px; border-radius: 15px; margin: 20px 0; 
                 border: 2px solid #ffc107; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h3 style="text-align: center; color: #e65100;">🎯 Help Us Reach Our Delivery Goal!</h3>
        <div style="text-align: center; margin: 20px 0;">
            <h2 style="color: #f57c00;">Current Subscribers: 0</h2>
            <h3 style="color: #ff9800;">Goal: 50-100 Subscribers</h3>
            <div style="background: #ddd; height: 20px; border-radius: 10px; margin: 20px auto; max-width: 400px;">
                <div style="background: linear-gradient(90deg, #4CAF50, #8BC34A); height: 100%; 
                           width: 0%; border-radius: 10px;"></div>
            </div>
        </div>
        <p style="text-align: center; font-size: 1.1em;">
            <strong>When we reach 50-100 subscriptions, we'll launch home delivery routes!</strong><br>
            Help us make it happen by signing up for our subscription service.
        </p>
        <p>📸 <em>Photo placeholder - Mission Impossible style motorcycle with egg delivery boxes</em></p>
    </div>
    """, unsafe_allow_html=True)
    
    # Call to Action
    st.markdown("---")
    st.markdown("## 📞 Questions About Pickup?")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button("📦 Subscribe for Delivery", type="primary", use_container_width=True):
            st.switch_page("📦 Subscription Service")
    
    with col2:
        if st.button("🥚 Order Fresh Eggs", use_container_width=True):
            st.switch_page("🥚 Order Fresh Eggs")
    
    with col3:
        if st.button("📞 Contact Us", use_container_width=True):
            st.switch_page("📞 Contact Us")
    
    st.markdown("---")
    st.info("💡 **Note:** All pickup locations and market schedules are subject to change. We'll notify customers of any updates via email or phone.")

def show_contact_page():
    """Contact information and form"""
    # Header section matching other pages - BIG title
    st.markdown(
        '<div style="text-align: center; font-size: 4.2em; color: #2e7d32; font-family: Georgia, serif; font-weight: bold; text-shadow: 3px 3px 6px rgba(0,0,0,0.3); margin-bottom: 20px; white-space: nowrap;">📞 Contact LMW Farm</div>',
        unsafe_allow_html=True
    )
    st.markdown('<div style="text-align: center; font-size: 1.2em; color: #666; font-style: italic; margin-bottom: 30px;">We\'d love to hear from you! Get in touch for orders, questions, or farm visits.</div>', unsafe_allow_html=True)
    
    # Add some spacing
    st.markdown("---")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.markdown("## 📋 Get in Touch")
        
        # Styled contact info boxes
        st.markdown("""
        <div style="background: linear-gradient(135deg, #e8f5e8, #f0f8f0);
                     padding: 20px; border-radius: 10px; margin: 15px 0;
                     border-left: 5px solid #4CAF50; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h4>📧 Email</h4>
            <p><strong>support@lmwfarm.com</strong></p>
            <p><em>For orders, questions, and general inquiries</em></p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("""
        <div style="background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
                     padding: 20px; border-radius: 10px; margin: 15px 0;
                     border-left: 5px solid #2196F3; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h4>📞 Phone</h4>
            <p><strong>336-555-1234</strong></p>
            <p><em>9 AM - 6 PM, Monday - Friday</em></p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("""
        <div style="background: linear-gradient(135deg, #fff8e1, #ffeaa7);
                     padding: 20px; border-radius: 10px; margin: 15px 0;
                     border-left: 5px solid #FF9800; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h4>🏡 Farm Location</h4>
            <p><strong>Mount Airy, NC</strong></p>
            <p><em>Farm visits by appointment only</em></p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("""
        <div style="background: linear-gradient(135deg, #fce4ec, #f8bbd9);
                     padding: 20px; border-radius: 10px; margin: 15px 0;
                     border-left: 5px solid #E91E63; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h4>⏰ Farm Hours</h4>
            <p><strong>Dawn to Dusk, 7 days a week</strong></p>
            <p><em>Response time: Within 24 hours</em></p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("## 💬 Send us a Message")
        
        # Form without the white box styling
        with st.form("contact_form"):
            name = st.text_input("Your Name *", placeholder="Enter your full name")
            email = st.text_input("Your Email *", placeholder="your.email@example.com")
            subject = st.selectbox("Subject *", [
                "General Question", 
                "Order Inquiry", 
                "Subscription Interest", 
                "Farm Visit Request",
                "Wholesale Inquiry",
                "Partnership Opportunity",
                "Other"
            ])
            message = st.text_area("Your Message *", 
                                 placeholder="Tell us how we can help you...", 
                                 height=120)
            
            # Add some spacing and style the submit button area
            st.markdown("<br>", unsafe_allow_html=True)
            
            submitted = st.form_submit_button("📤 Send Message", use_container_width=True)
            
            if submitted:
                if name and email and message:
                    st.success("✅ Message sent successfully! We'll get back to you within 24 hours.")
                    st.balloons()
                else:
                    st.error("❌ Please fill in all required fields (*)")
        
        # Add a helpful note
        st.markdown("""
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 20px;
                     border-left: 4px solid #1976d2;">
            <p><strong>💡 Quick Tip:</strong> For faster responses on orders, include your preferred pickup time and any special requests!</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Add a testimonial or social proof section
    st.markdown("---")
    st.markdown("## 🌟 What Our Customers Say")
    
    testimonial_col1, testimonial_col2, testimonial_col3 = st.columns(3)
    
    with testimonial_col1:
        st.markdown("""
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; text-align: center;">
            <p><em>"Always responsive and helpful! Fresh eggs delivered right on time."</em></p>
            <p><strong>- Cathy Sylvester</strong></p>
        </div>
        """, unsafe_allow_html=True)
    
    with testimonial_col2:
        st.markdown("""
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; text-align: center;">
            <p><em>"Great communication and the farm visit was amazing for our kids!"</em></p>
            <p><strong>- Lynn & Sam Galbato</strong></p>
        </div>
        """, unsafe_allow_html=True)
    
    with testimonial_col3:
        st.markdown("""
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; text-align: center;">
            <p><em>"Professional service and the freshest eggs in town!"</em></p>
            <p><strong>- Mario Faggiano</strong></p>
        </div>
        """, unsafe_allow_html=True)

def show_admin_panel():
    """Admin panel for farm management"""
    
    # Simple password protection
    if 'admin_authenticated' not in st.session_state:
        st.session_state.admin_authenticated = False
    
    if not st.session_state.admin_authenticated:
        st.markdown("# 🔐 Admin Access")
        password = st.text_input("Enter admin password:", type="password")
        if st.button("Login"):
            if password == "lmwfarm2025":  # Change this to a secure password
                st.session_state.admin_authenticated = True
                st.rerun()
            else:
                st.error("Incorrect password")
        return
    
    st.markdown("# 🔐 Farm Admin Panel")
    
    tab1, tab2, tab3, tab4 = st.tabs(["📦 Inventory", "📋 Orders", "👥 Customers", "📊 Reports"])
    
    with tab1:
        st.markdown("## Inventory Management")
        
        current_stock, last_updated = get_current_inventory()
        
        col1, col2 = st.columns(2)
        with col1:
            st.metric("Current Stock", f"{current_stock} dozen")
        with col2:
            st.metric("Last Updated", f"{(datetime.now() - last_updated).total_seconds() / 3600:.1f} hours ago")
        
        # Update inventory
        with st.form("update_inventory"):
            new_stock = st.number_input("Update Stock Level", min_value=0, value=current_stock)
            notes = st.text_input("Notes", placeholder="Daily collection, manual adjustment, etc.")
            
            if st.form_submit_button("Update Inventory"):
                if update_inventory(new_stock, notes):
                    st.success("✅ Inventory updated successfully!")
                    st.rerun()
                else:
                    st.error("❌ Failed to update inventory")
    
    with tab2:
        st.markdown("## Recent Orders")
        st.info("📋 Order management functionality coming soon!")
        # Here you would display recent orders from database
    
    with tab3:
        st.markdown("## Customer Database")
        st.info("👥 Customer management functionality coming soon!")
        # Here you would display customer information
    
    with tab4:
        st.markdown("## Farm Reports")
        st.info("📊 Reporting dashboard coming soon!")
        # Here you would show sales reports, trends, etc.
    
    # Logout button
    if st.button("🚪 Logout"):
        st.session_state.admin_authenticated = False
        st.rerun()

if __name__ == "__main__":
    main()