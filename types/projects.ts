export interface ProjectMetadata {
  category: string;
  title: string;
  description?: string;
  year: number;
  header_image?: string;
  tags?: string[];
  featured?: boolean;
  project_url: string;
  slug: string;
}

export interface BaseProjectProps extends ProjectMetadata {
  content: string;
}
