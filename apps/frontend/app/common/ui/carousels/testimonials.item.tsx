import { Quote } from '@kyero/icons';
import { type Testimonial } from '~/modules/homepage/api/get-testimonials.server';

export const TestimonialCard = ({ title, cite, author }: Testimonial) => (
  <article
    className="h-full overflow-hidden rounded-md bg-white p-5 lg:p-8"
    data-testid="testimonial"
  >
    <Quote className="text-sky-150" />
    <h3
      className="text-sierra-night-100 text-h-4-sm lg:text-h-4 mt-6 font-bold"
      data-testid="testimonial.title"
    >
      {title}
    </h3>
    <figure className="text-sierra-night-100 mt-1">
      <blockquote>
        <p
          className='text-p-2 before:content-["“"] after:content-["”"]'
          data-testid="testimonial.cite"
        >
          {cite}
        </p>
      </blockquote>
      <figcaption className="mt-4 flex gap-4">
        <div>
          <cite className="text-h-6 font-bold" data-testid="testimonial.author">
            {author}
          </cite>
        </div>
      </figcaption>
    </figure>
  </article>
);
