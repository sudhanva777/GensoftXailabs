import { StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Data Science Graduate",
    content:
      "The hands-on approach and real-world project helped me land my first job as a Data Analyst. The mentors were always supportive!",
    rating: 5,
  },
  {
    name: "Rahul Kumar",
    role: "Career Switcher",
    content:
      "Coming from a non-tech background, I was worried. But the beginner-friendly curriculum and practical tasks made learning easy and fun.",
    rating: 5,
  },
  {
    name: "Anjali Patel",
    role: "Fresh Graduate",
    content:
      "The internship experience was invaluable. Working on real tasks gave me confidence and practical skills that employers value.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Data Science Graduate",
    content:
      "The major project was challenging but rewarding. It became the centerpiece of my portfolio and helped me stand out in interviews.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "Data Analyst",
    content:
      "Affordable pricing and flexible schedule made it perfect for me. The 2-month track was intensive but worth every minute!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-[#FAFAFF]">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Hear from students who transformed their careers with our program
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="card-glass hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className="h-5 w-5 text-yellow-400 drop-shadow-[0_2px_6px_rgba(251,191,36,0.4)]" 
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
              <div className="border-t border-gray-200/50 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600 mt-1">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

