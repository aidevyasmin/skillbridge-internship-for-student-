const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About SkillBridge</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Empowering students to bridge the gap between education and professional opportunities
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              SkillBridge was founded with a simple yet powerful vision: to connect talented students
              with meaningful internship opportunities that help them launch their careers. We believe
              that every student deserves access to real-world experience, regardless of their background
              or location. By bridging the gap between education and industry, we're helping shape the
              future workforce of tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👨‍🎓</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Students</h3>
              <p className="text-gray-600">
                Discover internship opportunities, build professional profiles, and connect with top companies looking for fresh talent.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏢</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Companies</h3>
              <p className="text-gray-600">
                Post internship opportunities, find qualified candidates, and build your future workforce with eager, talented students.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
              <p className="text-gray-600">
                Our intelligent matching algorithm connects students with the most relevant internships based on their skills and interests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-2 border-primary-200 rounded-xl p-6 text-center hover:border-primary-400 transition">
              <h3 className="font-semibold text-primary-600 mb-2">Accessibility</h3>
              <p className="text-sm text-gray-600">Equal opportunities for all students</p>
            </div>
            <div className="border-2 border-primary-200 rounded-xl p-6 text-center hover:border-primary-400 transition">
              <h3 className="font-semibold text-primary-600 mb-2">Transparency</h3>
              <p className="text-sm text-gray-600">Clear and honest communication</p>
            </div>
            <div className="border-2 border-primary-200 rounded-xl p-6 text-center hover:border-primary-400 transition">
              <h3 className="font-semibold text-primary-600 mb-2">Innovation</h3>
              <p className="text-sm text-gray-600">Using AI to improve matching</p>
            </div>
            <div className="border-2 border-primary-200 rounded-xl p-6 text-center hover:border-primary-400 transition">
              <h3 className="font-semibold text-primary-600 mb-2">Growth</h3>
              <p className="text-sm text-gray-600">Supporting career development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Students</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2,000+</div>
              <div className="text-blue-200">Internships Posted</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-blue-200">Placement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions? Want to partner with us? We'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}

export default About