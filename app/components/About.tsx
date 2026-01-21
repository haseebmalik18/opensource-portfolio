export default function About() {
  return (
    <section id="about" className="section px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="relative">
            <div className="glass-card p-8 relative overflow-hidden">

              <div className="font-mono text-sm space-y-2">
                <div className="text-gray-500">// about_me.py</div>
                <div>
                  <span className="text-purple-400">class</span>{" "}
                  <span className="text-yellow-400">Developer</span>
                  <span className="text-gray-400">:</span>
                </div>
                <div className="pl-4">
                  <span className="text-purple-400">def</span>{" "}
                  <span className="text-blue-400">__init__</span>
                  <span className="text-gray-400">(self):</span>
                </div>
                <div className="pl-8">
                  <span className="text-gray-400">self.</span>
                  <span className="text-white">name</span>
                  <span className="text-gray-400"> = </span>
                  <span className="text-green-400">&quot;Haseeb&quot;</span>
                </div>
                <div className="pl-8">
                  <span className="text-gray-400">self.</span>
                  <span className="text-white">role</span>
                  <span className="text-gray-400"> = </span>
                  <span className="text-green-400">&quot;Software Engineer&quot;</span>
                </div>
                <div className="pl-8">
                  <span className="text-gray-400">self.</span>
                  <span className="text-white">passion</span>
                  <span className="text-gray-400"> = </span>
                  <span className="text-green-400">&quot;Open Source&quot;</span>
                </div>
                <div className="mt-4 pl-4">
                  <span className="text-purple-400">def</span>{" "}
                  <span className="text-blue-400">contribute</span>
                  <span className="text-gray-400">(self, project):</span>
                </div>
                <div className="pl-8">
                  <span className="text-purple-400">return</span>{" "}
                  <span className="text-green-400">amazing_code</span>
                  <span className="text-gray-400"> ✨</span>
                </div>
              </div>


              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
            </div>
          </div>


          <div>
            <span className="text-indigo-400 font-medium text-sm uppercase tracking-wider">About Me</span>
            <h2 className="section-title gradient-text mt-2 mb-6">
              Crafting Code That Makes a Difference
            </h2>
            
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I'm a passionate software engineer with a deep love for open source development. 
                I believe in the power of community-driven software and actively contribute 
                to projects that help developers build better products.
              </p>
              <p>
                My journey in tech has led me to work on exciting projects ranging from 
                <span className="text-indigo-400"> cloud infrastructure</span> to{" "}
                <span className="text-indigo-400">data engineering pipelines</span>. 
                I specialize in building robust, scalable solutions that solve real-world problems.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, 
                contributing to open source, or sharing knowledge with the developer community.
              </p>
            </div>


            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <div className="text-2xl font-bold text-indigo-400">🎯</div>
                <div className="text-sm text-gray-400 mt-2">Focus on Impact</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-2xl font-bold text-indigo-400">🚀</div>
                <div className="text-sm text-gray-400 mt-2">Ship Quality Code</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-2xl font-bold text-indigo-400">🤝</div>
                <div className="text-sm text-gray-400 mt-2">Open Source First</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-2xl font-bold text-indigo-400">📚</div>
                <div className="text-sm text-gray-400 mt-2">Always Learning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
