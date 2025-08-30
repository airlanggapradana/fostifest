import TextHighlighter from "@/components/fancy/text/text-highlighter.tsx";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-950 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            About <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Us</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Since 2018, we've been empowering university students worldwide to showcase their talents,
            connect with peers, and compete at the highest level across diverse academic disciplines.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-100 mb-6">What <span
              className={'text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 to-teal-400 font-bold'}>FOSTIFEST</span> actually
              is?</h3>
            <div className="space-y-4 font-medium text-gray-300 leading-relaxed">
              <p>
                FOSTIFEST is an annual event <TextHighlighter highlightColor="hsl(172, 67%, 60%)"
                                                              className={'text-gray-700 rounded-[0.3em] px-px'}
                                                              transition={{
                                                                type: "spring",
                                                                duration: 1,
                                                                delay: 0.5,
                                                                bounce: 0
                                                              }}
              >organized
                by
                the Forum
                Open Source of Informatics Engineering (FOSTI)</TextHighlighter> at
                Universitas Muhammadiyah Surakarta (UMS). This year, FOSTIFEST 2025 brings the theme <TextHighlighter
                highlightColor="hsl(172, 67%, 60%)"
                className={'text-gray-700 rounded-[0.3em] px-px'}
                transition={{
                  type: "spring",
                  duration: 1,
                  delay: 0.5,
                  bounce: 0
                }}
              >“Beyond Codes:
                Creativity in the Digital Age.”</TextHighlighter>
              </p>
              <p>
                The event features an interactive workshop on building a real-time chat application with Vue.js, along
                with thrilling competitions in Competitive Programming, Software Development, and UI/UX Design.
              </p>
              <p>
                FOSTIFEST is more than just a celebration of technology—<TextHighlighter
                highlightColor="hsl(172, 67%, 60%)"
                className={'text-gray-700 rounded-[0.3em] px-px'}
                transition={{
                  type: "spring",
                  duration: 1,
                  delay: 0.5,
                  bounce: 0
                }}
              >it’s a stage to sharpen technical expertise,
                unleash creativity, and unlock career opportunities in the digital world.</TextHighlighter> A place
                where imagination goes
                hand in hand with innovation. 🚀
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="University students collaborating"
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;