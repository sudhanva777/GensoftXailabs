import { CheckCircleIcon } from "@heroicons/react/24/solid";

const weeks = [
  {
    week: "Week 1",
    title: "Python Basics",
    topics: ["Variables & Data Types", "Control Structures", "Functions", "Libraries"],
  },
  {
    week: "Week 2",
    title: "Pandas & Data Cleaning",
    topics: ["DataFrames", "Data Cleaning", "Data Manipulation", "Handling Missing Data"],
  },
  {
    week: "Week 3",
    title: "Visualization",
    topics: ["Matplotlib", "Seaborn", "Creating Charts", "Dashboard Design"],
  },
  {
    week: "Week 4",
    title: "Statistics",
    topics: ["Descriptive Statistics", "Probability", "Hypothesis Testing", "Correlation"],
  },
  {
    week: "Week 5",
    title: "ML Basics",
    topics: ["Supervised Learning", "Regression", "Classification", "Model Evaluation"],
  },
  {
    week: "Week 6",
    title: "Major Project + Review",
    topics: ["Project Planning", "Implementation", "Report Writing", "Presentation"],
  },
];

export default function CurriculumTimeline() {
  return (
    <section className="section-padding bg-[#EEF2FF]">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Weekly Curriculum
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A structured 6-week program designed for practical learning
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {weeks.map((weekData, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index < weeks.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-primary opacity-20 hidden md:block" />
                )}
                
                <div className="flex items-start space-x-4 md:space-x-6">
                  {/* Week number circle */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                        {weekData.week}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      {weekData.title}
                    </h3>
                    <ul className="space-y-2">
                      {weekData.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start space-x-2">
                          <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

