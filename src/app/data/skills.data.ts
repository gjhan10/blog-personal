export interface SkillGroup {
  title: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Backend',
    items: ['Java 24', 'Spring Boot', 'APIs REST', 'RxJava', 'Microservicios', 'Swagger / OpenAPI', 'JMeter'],
  },
  {
    title: 'Datos y mensajería',
    items: ['Microsoft SQL Server', 'Azure SQL', 'Oracle Database', 'MongoDB', 'Redis', 'Apache Kafka'],
  },
  {
    title: 'Frontend',
    items: ['Angular', 'TypeScript', 'RxJS', 'HTML', 'CSS / SCSS', 'Angular Material', 'Diseño responsive'],
  },
  {
    title: 'Herramientas y entrega',
    items: ['Git / GitFlow', 'GitHub', 'Bitbucket', 'Docker', 'Jenkins', 'Microsoft Azure', 'Azure DevOps', 'SonarQube', 'Fortify', 'Scrum'],
  },
];
