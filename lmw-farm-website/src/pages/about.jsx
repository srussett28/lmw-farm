import lmwfam from '/src/assets/LMWFam.jpg'; 
import sbr from '/src/assets/sbr.jpg'; 

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-orange-100">
      {/* Hero Section with Motto */}
      <section className="bg-gradient-to-r from-teal-700 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About LMW Farm</h1>
            <p className="text-2xl md:text-3xl font-bold text-blue-200 mb-6">
              Proudly Veteran Owned & Operated Since 2025
            </p>
            <p className="text-3xl md:text-4xl font-serif italic text-amber-200">
              "Making a Living off Living."
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section with Family Photo */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-800">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-5xl">📖</span>
                <h2 className="text-4xl font-bold text-teal-800">Our Story</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left Column - Story Text */}
                <div className="md:w-2/3 space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p className="font-bold text-xl text-gray-800">
                    We walked away from everything the world said we should want.
                  </p>
                  
                  <p>
                   Successful careers. Comfort. The "American Dream." But something was missing.
                  </p>
                  
                  <p className="font-semibold text-gray-800">
                    This land calls to us.
                  </p>
                  
                  <p>
                    For generations my family farmed the Vermont land, and that heritage runs deeper than any paycheck. When we looked at our three daughters—Lundyn, Marlow, and Winnie (LMW)—we knew we wanted to give them something more valuable than money.
                  </p>
                  
                  <p className="font-semibold text-gray-800">
                    We wanted to give them purpose.
                  </p>
                  
                  <p>
                    Every morning at dawn, we're out there. Not because we have to, but because these birds depend on us. Because this land trusts us. Because teaching our girls that real wealth comes from caring for something bigger than yourself.
                  </p>
                  
                  <p className="font-semibold text-gray-800">
                    Our promise is simple:
                  </p>
                  
                  <p>
                    Happy chickens lay better eggs. Period. No shortcuts, no compromises, no corporate BS. Just honest work, honest food, and an honest living.
                  </p>
                  
                  <p className="italic font-semibold text-gray-800">
                    This isn't just our business. It's our family's legacy.
                  </p>
                </div>

                {/* Right Column - Family Photo */}
                <div className="md:w-1/3 flex items-start justify-center">
                  <img 
                    src={lmwfam}
                    alt="The LMW Farm Family" 
                    className="rounded-lg shadow-2xl w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-2">
        <div className="container mx-auto px-4">
          <div className="border-t-2 border-teal-600 mx-8"></div>
        </div>
      </div>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-5xl">🎯</span>
              <h2 className="text-4xl font-bold text-teal-800">Our Mission</h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed mb-4 font-serif italic">
              To provide our community with the freshest, highest-quality eggs and chicks while building a sustainable farm that our daughters can be proud of—and that future generations can learn from.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We're not here to be the biggest farm. We're here to prove that doing things right—treating animals with respect, caring for the land, and serving our neighbors—is not just possible, it's profitable. And more importantly, it's the kind of life worth living.
            </p>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-2">
        <div className="container mx-auto px-4">
          <div className="border-t-2 border-teal-600 mx-8"></div>
        </div>
      </div>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-5xl">⭐</span>
              <h2 className="text-4xl font-bold text-teal-800">Our Values</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="text-2xl font-bold text-green-700 mb-2">Animal Welfare First</h3>
                <p className="text-lg text-gray-700">
                  Our chickens have space, fresh air, and the freedom to live as chickens should. We measure success not just in eggs produced, but in the health and happiness of our flock.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-2xl font-bold text-blue-700 mb-2">Regenerative Farming</h3>
                <p className="text-lg text-gray-700">
                  We don't just sustain the land—we improve it. Our chickens naturally fertilize and aerate the soil, building healthier pastures for future generations.
                </p>
              </div>
              <div className="border-l-4 border-orange-600 pl-4">
                <h3 className="text-2xl font-bold text-orange-700 mb-2">Community Over Profit</h3>
                <p className="text-lg text-gray-700">
                  We're not trying to scale to grocery stores or maximize margins. We're building relationships with neighbors who want to know where their food comes from.
                </p>
              </div>
              <div className="border-l-4 border-teal-600 pl-4">
                <h3 className="text-2xl font-bold text-teal-700 mb-2">Hard Work & Integrity</h3>
                <p className="text-lg text-gray-700">
                  Military service taught us that excellence isn't about shortcuts—it's about showing up every day and doing the work right, even when no one's watching.
                </p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="text-2xl font-bold text-purple-700 mb-2">Family Legacy</h3>
                <p className="text-lg text-gray-700">
                  Everything we build is for Lundyn, Marlow, and Winnie. We want them to grow up understanding the value of honest work and the satisfaction of caring for something greater than themselves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-2">
        <div className="container mx-auto px-4">
          <div className="border-t-2 border-teal-600 mx-8"></div>
        </div>
      </div>

      {/* Founder Bio */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-800">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-4xl font-bold text-teal-800">Meet the Founder</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left Column - Bio Text */}
                <div className="md:w-2/3 space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p className="font-bold text-xl text-gray-800">
                    From Corporate Analytics to Chicken Coops
                  </p>
                  
                  <p>
                    LMW Farm was founded by a veteran and data analytics professional who spent over a decade in corporate America—working for companies like Deloitte and Lockheed Martin, holding a Master's degree from Duke University's Fuqua School of Business, and building a six-figure career solving complex problems with data.
                  </p>
                  
                  <p>
                    But numbers on spreadsheets couldn't compare to the pull of the land and the desire to build something real with his hands.
                  </p>
                  
                  <p>
                    After years of military service, including leading a 45-person logistics team, he learned that true leadership isn't about managing people—it's about serving something bigger than yourself. That same principle drives LMW Farm today.
                  </p>
                  
                  <p>
                    Combined with his wife's Vermont farming heritage—generations of family who worked the land—they made the decision to walk away from the corporate ladder and build a life rooted in purpose, not paychecks.
                  </p>
                  
                  <p className="font-semibold text-gray-800">
                    The Mission: Create a farm that honors tradition while embracing innovation
                  </p>
                  
                  <p>
                    LMW Farm isn't just about eggs and chicks. It's about proving that you can leave the corporate world behind and build something meaningful. It's about teaching three daughters—Lundyn, Marlow, and Winnie—that the best things in life aren't bought, they're built.
                  </p>
                  
                  <p className="italic">
                    From analyzing supply chains to managing chicken coops, from boardrooms to barnyards—this is the next chapter. And it's only just beginning.
                  </p>
                </div>

                {/* Right Column - Founder Photo */}
                <div className="md:w-1/3 flex items-start justify-center">
                  <img 
                    src={sbr}
                    alt="LMW Farm Founder" 
                    className="rounded-lg shadow-2xl w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;