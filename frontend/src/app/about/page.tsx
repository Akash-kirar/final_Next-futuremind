import { Brain, Target, Award, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-full bg-gradient-to-b from-[#f8f9ff] via-[#fbfcff] to-white pb-8 md:pb-16 selection:bg-violet-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-[#563bfa] text-[10px] sm:text-[11px] font-extrabold bg-[#f3efff] px-3.5 py-1.5 rounded-full mb-3 shadow-2xs border border-violet-100 uppercase tracking-wide">
            <Sparkles size={13} className="text-[#563bfa]" />
            <span>Our Mission & Story</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">
            Empowering Human Potential with AI
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            NextFutureMind was built to make cutting-edge artificial
            intelligence accessible, practical, and enjoyable for students,
            creators, and professionals worldwide.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs text-center">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 text-[#563bfa] flex items-center justify-center mx-auto mb-3">
              <Brain size={24} />
            </div>
            <h3 className="font-extrabold text-sm text-gray-900 mb-1">
              Right Tools
            </h3>
            <p className="text-sm text-gray-500">
              Curated directories and unbiased reviews of only the top 1% of AI
              tools.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Target size={24} />
            </div>
            <h3 className="font-extrabold text-sm text-gray-900 mb-1">
              Practical Skills
            </h3>
            <p className="text-sm text-gray-500">
              Step-by-step masterclasses designed for tangible everyday
              productivity.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs text-center">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3">
              <Award size={24} />
            </div>
            <h3 className="font-extrabold text-sm text-gray-900 mb-1">
              Brighter Results
            </h3>
            <p className="text-sm text-gray-500">
              Transform repetitive busywork into 10x creative and analytical
              output.
            </p>
          </div>
        </div>

        {/* Community & Team quote */}
        <div className="bg-gradient-to-br from-[#f3efff] to-[#e8e0ff] rounded-3xl p-6 border border-violet-100/80 text-center relative overflow-hidden">
          <div className="font-handwriting text-[#563bfa] text-2xl mb-2">
            Better Skills, Brighter Tomorrow 💜
          </div>
          <p className="text-sm text-gray-700 max-w-lg mx-auto leading-relaxed mb-4">
            &ldquo;AI won&apos;t replace humans, but humans using AI will
            replace those who don&apos;t. We&apos;re here to make sure you lead
            that future with confidence.&rdquo;
          </p>
          <div className="text-xs font-extrabold text-gray-900">
            The NextFutureMind Team
          </div>
        </div>
      </div>
    </div>
  );
}
