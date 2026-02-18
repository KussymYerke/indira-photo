// GROQ queries used by the Next.js app

export const settingsQuery = /* groq */ `
  *[_id == "settings"][0]{
    fullName,
    tagline,
    bio,
    city,
    phone,
    instagramUrl,
    portrait,
  }
`;

export const heroQuery = /* groq */ `
  *[_id == "hero"][0]{
    slides[]{
      image,
      eyebrow,
      title,
      subtitle,
      primaryCta{label, href},
      secondaryCta{label, href},
      footerLeftLabel,
      footerProject
    }
  }
`;

export const featuredSectionQuery = /* groq */ `
  *[_id == "featuredSection"][0]{
    eyebrow,
    title,
    works[]-> {
      _id,
      title,
      "slug": slug.current,
      category,
      excerpt,
      cover,
      images
    }
  }
`;

export const worksByCategoryQuery = /* groq */ `
  *[_type == "work" && category == $category] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    cover,
    images
  }
`;

export const allWorksQuery = /* groq */ `
  *[_type == "work"] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    cover,
    images
  }
`;

export const workBySlugQuery = /* groq */ `
  *[_type == "work" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    cover,
    images
  }
`;

export const allWorkSlugsQuery = /* groq */ `
  *[_type == "work" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const worksByCategoryNonFeaturedQuery = /* groq */ `
  *[_type == "work" && category == $category && featured != true] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    cover,
    images
  }
`;

export const worksNonFeaturedQuery = /* groq */ `
  *[_type == "work" && defined(slug.current) && featured != true]
  | order(date desc, _createdAt desc) {
    _id,
    title,
    slug,
    featured,
    coverImage,
    category,
    date
  }
`;

export const featuredWorksQuery = /* groq */ `
  *[_type == "work" && defined(slug.current) && featured == true]
  | order(date desc, _createdAt desc) {
    _id,
    title,
    slug,
    featured,
    coverImage,
    category,
    date
  }
`;
