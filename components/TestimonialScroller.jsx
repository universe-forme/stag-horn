'use client';
import Image from 'next/image';

const testimonials = [
    { text: "Top-notch quality. My cooking feels professional now!", name: "Emma Collins", date: "01 - 08 - 2025", img: "/testimonial-profile-img.jpg" },
    { text: "I ordered a custom-forged sword and was blown away by the detail. It is not just a weapon — it is art. Stag Horn has revived old-world quality in a modern world.", name: "Mariam Zafar", date: "01 - 08 - 2025", img: "/testimonial-profile-img.jpg" },
    { text: "I bought a 3-piece knife set from Stag Horn, and I now actually enjoy cooking. The grip, the sharpness, the design — love everything!", name: "Naveed Ahmed", date: "01 - 08 - 2025", img: "/testimonial-profile-img.jpg" },
    { text: "I bought a 3-piece knife set from Stag Horn, and I now actually enjoy cooking. The grip, the sharpness, the design — love everything!", name: "Sarah Lee", date: "01 - 08 - 2025", img: "/testimonial-profile-img.jpg" },
    { text: "We have been sourcing from Stag Horn Cutlery Work for over two years. Their consistency, packaging, and client service are exceptional. Every piece feels like a premium product — because it is.", name: "Jimmy", date: "01 - 08 - 2025", img: "/testimonial-profile-img.jpg" },
    { text: "Blades that do not just cut — they glide. Excellent craftsmanship. Proud to support a Pakistani brand making waves globally.", name: "John Doe", date: "01 - 08 - 2025", img: "/testimonial-profile-img.jpg" },
    { text: "The custom sword I ordered was beyond my expectations. Intricate hand-etching, perfectly balanced, and incredibly well packaged. This is world-class metalwork.", name: "Alex Turner", date: "01 - 08 - 2025", img: "/testimonial-profile-img.jpg" },
    { text: "We have been sourcing from Stag Horn Cutlery Work for over two years. Their consistency, packaging, and client service are exceptional. Every piece feels like a premium product — because it is.", name: "Mike Johnson", date: "01 - 08 - 2025", img: "/testimonial-profile-img.jpg" },
];

const TestimonialItem = ({ testimonial }) => (
    <div className="testimonial-item">
        <div className="testimonial-card">
            <p className="testimonial-text">{testimonial.text}</p>
        </div>
        <div className="flex items-center mt-4">
            <Image src={testimonial.img} width={48} height={48} alt={testimonial.name} className="profile-image" />
            <div>
                <div className="customer-name">{testimonial.name}</div>
                <div className="customer-date">{testimonial.date}</div>
            </div>
        </div>
    </div>
);

const TestimonialScroller = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="mb-16 text-center">Testimonials</h2>
                <div className="testimonial-scroller">
                    <div className="masonry-grid scroller-inner">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialItem key={index} testimonial={testimonial} />
                        ))}
                        {/* Duplicate for infinite scroll effect */}
                        {testimonials.map((testimonial, index) => (
                            <TestimonialItem key={`dup-${index}`} testimonial={testimonial} aria-hidden="true" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialScroller;