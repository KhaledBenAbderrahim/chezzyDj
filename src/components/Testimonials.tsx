import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: "Miguel Rodriguez",
      role: "Wedding Client",
      content: "Hiring this DJ for our wedding was the best decision we made! The Latin music selection was perfect - from romantic bachata for our first dance to salsa and reggaeton that had everyone on the dance floor all night. Truly made our special day unforgettable!",
      rating: 5,
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    {
      name: "Carolina Mendez",
      role: "Club Owner",
      content: "Our Latin nights have never been more successful since we started working with this incredible DJ. The energy, music selection, and ability to read the crowd is unmatched. Our dance floor is consistently packed and patrons keep coming back for more!",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      name: "David Thompson",
      role: "Corporate Event Planner",
      content: "We hired this DJ for our company's international celebration, and they delivered beyond expectations. The Latin music added the perfect cultural touch while maintaining a professional atmosphere. Everyone from executives to staff was impressed!",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-black to-gray-900 relative">
      {/* Background decorations */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-5 -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl opacity-5 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-red-500 to-yellow-500"></div>
            <p className="uppercase tracking-wider text-sm font-medium text-yellow-500">{t('testimonials.title')}</p>
            <div className="h-px w-12 bg-gradient-to-r from-yellow-500 to-red-500"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonials.heading')}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {t('testimonials.description')}
          </p>
        </div>

        {/* Testimonial slider */}
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-8xl opacity-10 text-red-500 z-0">
            <Quote size={80} />
          </div>
          
          <div className="relative z-10 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700">
            <div className="min-h-[320px] flex flex-col justify-between">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-1000 absolute inset-0 p-8 md:p-12 ${
                    index === currentTestimonial ? 'opacity-100 z-20' : 'opacity-0 -z-10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-16 h-16 object-cover rounded-full border-2 border-yellow-500"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{testimonial.name}</h3>
                        <p className="text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-lg italic mb-8">"{testimonial.content}"</p>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial ? 'w-8 bg-red-500' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;