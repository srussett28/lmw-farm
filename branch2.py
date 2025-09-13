import streamlit as st
import pandas as pd
from datetime import datetime
import base64
import os
import psycopg2
from psycopg2.extras import RealDictCursor

# Page configuration
st.set_page_config(
    page_title="LMW Farm - Coming Soon!",
    page_icon="🥚",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for farm aesthetic
st.markdown("""
<style>
   .stApp {
       background-color: #e6f3ff;  /* Soft baby blue background */
   }
   
   .main-header {
       font-size: 4.5em;
       color: #2e7d32;
       text-align: center;
       font-family: Georgia, serif;
       margin-bottom: 0.5em;
       text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
   }
   
   .farm-story {
       background-color: #f8f6f0;
       padding: 25px;
       border-radius: 15px;
       border-left: 5px solid #8B4513;
       margin: 25px 0;
       box-shadow: 0 4px 8px rgba(0,0,0,0.1);
   }
   
   .product-card {
       background-color: white;
       padding: 25px;
       border-radius: 15px;
       box-shadow: 0 4px 8px rgba(0,0,0,0.1);
       margin: 20px 0;
       border: 2px solid #e8f5e8;
   }
   
   .coming-soon-box {
       background: linear-gradient(135deg, #fff3e0, #fef7f0);
       padding: 30px;
       border-radius: 15px;
       border: 3px solid #ff9800;
       margin: 25px 0;
       text-align: center;
       box-shadow: 0 6px 12px rgba(0,0,0,0.1);
   }
   
   .interest-form {
       background: linear-gradient(135deg, #e8f5e8, #f0fff0);
       padding: 30px;
       border-radius: 15px;
       border: 2px solid #4CAF50;
       margin: 25px 0;
       box-shadow: 0 4px 8px rgba(0,0,0,0.1);
   }
   
   .stImage > div {
       display: flex !important;
       justify-content: center !important;
   }
   
   .stImage img {
       margin: 0 auto !important;
       display: block !important;
       border-radius: 15px;
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

def save_interest_form(name, email, phone, location, interests, contact_preference, notes):
    """Save interest form submission to database"""
    conn = init_database_connection()
    if not conn:
        return False
    
    try:
        with conn.cursor() as cur:
            # Create table if it doesn't exist
            cur.execute("""
                CREATE TABLE IF NOT EXISTS launch_interest (
                    id SERIAL PRIMARY KEY,
                    submitted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    phone VARCHAR(50),
                    location VARCHAR(255),
                    interests TEXT,
                    contact_preference VARCHAR(50),
                    notes TEXT
                )
            """)
            
            # Insert the submission
            cur.execute("""
                INSERT INTO launch_interest 
                (name, email, phone, location, interests, contact_preference, notes)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (name, email, phone, location, ', '.join(interests), contact_preference, notes))
            
            conn.commit()
            return True
    except Exception as e:
        conn.rollback()
        st.error(f"Error saving to database: {e}")
        return False
    finally:
        conn.close()

def main():
    # Hero section with logo and family photo
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        # Main banner
        st.markdown(
            '<div style="text-align: center; font-size: 4.8em; color: #2e7d32; font-family: Georgia, serif; font-weight: bold; text-shadow: 3px 3px 6px rgba(0,0,0,0.3); margin-bottom: 20px;">Welcome to LMW Farm</div>',
            unsafe_allow_html=True
        )
        
        # Veteran-owned subtitle
        st.markdown(
            '<div style="text-align: center; font-size: 1.6em; color: #1976d2; font-family: Georgia, serif; font-weight: bold; margin-bottom: 20px; text-shadow: 1px 1px 3px rgba(0,0,0,0.2);">Proudly Veteran Owned & Operated</div>',
            unsafe_allow_html=True
        )
        
        # Farm logo
        try:
            st.image("pictures/Updatedlogo.png", use_container_width=True)
        except:
            st.markdown("🥚🐔🏡")  # Fallback if image not found
        
        # Tagline
        st.markdown(
            '<div style="text-align: center; font-size: 2.5em; color: #000000; font-style: italic; margin-top: 25px;">Fresh Farm Eggs & Premium Baby Chicks</div>',
            unsafe_allow_html=True
        )
    
    # Coming Soon Alert
    st.markdown("""
    <div class="coming-soon-box">
        <h1 style="color: #e65100; margin: 0; font-size: 3em;">🚀 COMING SOON!</h1>
        <p style="font-size: 1.3em; color: #f57c00; margin: 15px 0; font-weight: bold;">
            We're launching Spring 2025 with fresh farm eggs and baby chicks!
        </p>
        <p style="font-size: 1.1em; color: #333; margin: 10px 0;">
            Currently building our flock and preparing for launch. Sign up below to be notified when we go live!
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Two-column layout for story and family photo
    col1, col2 = st.columns([1.7, 1.3])
    
    with col1:
        try:
            st.image("pictures/LMWFam.JPG", caption="The LMW Farm Family", use_container_width=True)
        except:
            st.info("📸 Family photo coming soon!")
    
    with col2:
        st.markdown("# 🌾 Our Story")
        st.markdown("""
        **We believe in simple things: honest work, caring for the land, and raising our daughters with purpose.**
        
        When we looked at our three daughters Lundyn, Marlow, and Winnie (LMW), we knew we wanted to give them something different. Something real.
        
        **This land calls to us.** For generations, my family farmed a 1000 acre farm in Vermont, and that 
        heritage runs deeper than any office. Teaching our girls that real wealth comes from 
        caring for something bigger than yourself.
        
        **We wanted to give them purpose.**
        
        Every morning at dawn, we're out there. Not because we have to, but because these birds depend 
        on us. Because this land trusts us. Because teaching our girls that real wealth comes from 
        caring for something bigger than yourself.
        
        **Our promise is simple:** Happy chickens lay better eggs. Period.
        
        *This isn't just our business. It's our family's legacy.*
        """)
    
    st.markdown('<hr style="border: 2px solid #ccc; margin: 40px 0;">', unsafe_allow_html=True)
    
    # What's Coming Section
    st.markdown("## 🎯 What We're Building")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        <div class="product-card">
            <h3 style="color: #2e7d32; text-align: center;">🥚 Fresh Farm Eggs</h3>
            <ul style="font-size: 1.1em; line-height: 1.8;">
                <li><strong>Grade AA Quality</strong> - Candled and inspected daily</li>
                <li><strong>Rainbow Dozens</strong> - Blue, brown, green, white eggs</li>
                <li><strong>Free-Range Happy</strong> - 10+ sq ft per bird on pasture</li>
                <li><strong>14 Heritage Breeds</strong> - Unique variety and flavors</li>
                <li><strong>Collected Fresh</strong> - Never more than 3 days old</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="product-card">
            <h3 style="color: #e65100; text-align: center;">🐣 Premium Baby Chicks</h3>
            <ul style="font-size: 1.1em; line-height: 1.8;">
                <li><strong>4 Select Breeds</strong> - Carefully selected varieties</li>
                <li><strong>Healthy & Hardy</strong> - Raised on pasture from day one</li>
                <li><strong>Spring Availability</strong> - Perfect timing for backyard flocks</li>
                <li><strong>Heritage Varieties</strong> - Unique colors and egg types</li>
                <li><strong>Expert Support</strong> - We help you succeed</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    # Current Progress
    st.markdown("## 📊 Our Progress to Launch")
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(
            label="🐔 Current Chickens",
            value="130",
            delta="Growing daily",
            help="Our flock includes layers and future layers at different stages"
        )
    
    with col2:
        st.metric(
            label="🎯 Launch Goal",
            value="150+",
            delta="Egg layers",
            help="Target for consistent daily egg production"
        )
    
    with col3:
        st.metric(
            label="📅 Target Launch",
            value="Spring 2025",
            delta="3-6 months",
            help="When our laying hens reach production age"
        )
    
    with col4:
        st.metric(
            label="📍 Service Area",
            value="Surry County",
            delta="NC Triad",
            help="Mount Airy, Pilot Mountain, Dobson areas"
        )
    
    st.markdown('<hr style="border: 2px solid #ccc; margin: 40px 0;">', unsafe_allow_html=True)
    
    # Interest Capture Form
    st.markdown("""
    <div class="interest-form">
        <h2 style="text-align: center; color: #2e7d32; margin-bottom: 20px;">🔔 Join Our Launch List!</h2>
        <p style="text-align: center; font-size: 1.2em; color: #333; margin-bottom: 25px;">
            Be the first to know when fresh eggs and baby chicks become available!
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    with st.form("interest_form", clear_on_submit=True):
        col1, col2 = st.columns(2)
        
        with col1:
            name = st.text_input("Your Name *", placeholder="Enter your full name")
            email = st.text_input("Email Address *", placeholder="your.email@example.com")
            phone = st.text_input("Phone Number", placeholder="(optional) for text updates")
        
        with col2:
            location = st.text_input("Your Location", placeholder="Mount Airy, Pilot Mountain, etc.")
            interest = st.multiselect(
                "What interests you most? *", 
                ["Fresh Eggs", "Baby Chicks", "Farm Visits", "Subscription Service", "Market Updates"],
                help="Select all that apply"
            )
            contact_preference = st.selectbox("Preferred Contact Method", ["Email", "Phone", "Text", "Any"])
        
        special_notes = st.text_area(
            "Questions or Special Interests", 
            placeholder="Specific breeds, quantities, delivery preferences, etc...",
            height=100
        )
        
        # Add spacing before submit button
        st.markdown("<br>", unsafe_allow_html=True)
        
        submitted = st.form_submit_button("🚀 Join the Launch List!", use_container_width=True)
        
        if submitted:
            if name and email and interest:
                # Save to database
                if save_interest_form(name, email, phone, location, interest, contact_preference, special_notes):
                    st.success(f"""
                    ✅ **Welcome to the LMW Farm family, {name}!**
                    
                    You're now on our launch list and will be notified as soon as we have:
                    {', '.join(interest)}
                    
                    **What happens next:**
                    - We'll send launch updates to {email}
                    - First access to fresh eggs and chicks
                    - Special launch pricing for early supporters
                    - Invitation to our farm opening event
                    
                    Thank you for supporting local agriculture! 🌱
                    """)
                    st.balloons()
                else:
                    st.error("Sorry, there was an issue saving your information. Please try again or contact us directly.")
            else:
                st.error("Please fill in your name, email, and select at least one interest area.")
    
    # Preview of pickup options
    st.markdown('<hr style="border: 2px solid #ccc; margin: 40px 0;">', unsafe_allow_html=True)
    
    st.markdown("## 📍 Planned Pickup Locations")
    st.markdown("*Convenient pickup options throughout Surry County*")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        **🌾 Farmers Markets**
        - Mount Airy (Fridays)
        - Dobson (Fridays)  
        - Future: King, Elkin, Pilot Mountain
        """)
    
    with col2:
        st.markdown("""
        **🏪 Strategic Locations**
        - Mayberry Mall
        - Public Libraries
        - Community Centers
        - Surry Community College
        """)
    
    with col3:
        st.markdown("""
        **🚚 Future Services**
        - Home delivery routes
        - Subscription service
        - Refrigerated lockers
        - Farm store location
        """)
    
    # Footer with contact info
    st.markdown('<hr style="border: 2px solid #ccc; margin: 40px 0;">', unsafe_allow_html=True)
    
    st.markdown("## 📞 Get in Touch")
    
    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown("**📧 Email:** lmwfarm2025@gmail.com")
    with col2:
        st.markdown("**📱 Phone:** Coming Soon")
    with col3:
        st.markdown("**📍 Location:** Mount Airy, NC")
    
    # Final call to action
    st.markdown(
        """
        <div style="text-align: center; color: #666; font-style: italic; padding: 30px; background: linear-gradient(135deg, #f5f5f5, #ffffff); border-radius: 15px; margin: 30px 0;">
        🌱 <strong>Fresh. Local. Family.</strong> 🌱<br>
        <em>Building something special for our community - one egg at a time.</em><br><br>
        <strong>Follow our journey and be part of the LMW Farm story!</strong>
        </div>
        """, 
        unsafe_allow_html=True
    )

if __name__ == "__main__":
    main()