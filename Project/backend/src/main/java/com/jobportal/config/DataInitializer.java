package com.jobportal.config;

import com.jobportal.model.Application;
import com.jobportal.model.Job;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.JobRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public DataInitializer(JobRepository jobRepository, ApplicationRepository applicationRepository) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    @Override
    public void run(String... args) {
        if (jobRepository.count() == 0) {
            Job job1 = new Job(
                    "Senior Full Stack Java Engineer",
                    "TechCorp Solutions",
                    "Bangalore, India",
                    "Full-time",
                    "Senior (5+ yrs)",
                    "$110,000 - $135,000 / yr",
                    "We are seeking a seasoned Full Stack Java Engineer to lead the architecture and development of our next-generation cloud services. You will work closely with product managers and distributed cross-functional teams to build resilient microservices and delightful web user interfaces.",
                    "Strong proficiency in Java 17+, Spring Boot 3, and Spring Data JPA.\nExperience with modern React, TypeScript, and Tailwind CSS.\nHands-on experience with PostgreSQL, indexing, and query optimization.\nFamiliarity with Docker, Kubernetes, and CI/CD pipelines.",
                    "careers@techcorp.com",
                    "OPEN"
            );

            Job job2 = new Job(
                    "React / Frontend Developer",
                    "PixelCraft Studios",
                    "Remote",
                    "Remote",
                    "Mid-level (3+ yrs)",
                    "$85,000 - $105,000 / yr",
                    "PixelCraft is looking for a creative, detail-oriented Frontend Developer to build clean, responsive, and accessible web applications. You will translate Figma prototypes into pixel-perfect components and optimize web performance.",
                    "3+ years of professional React and modern JavaScript/TypeScript experience.\nDeep understanding of HTML5, CSS3, Tailwind CSS, and state management (Redux/Zustand).\nExperience integrating RESTful APIs and handling error states.\nKnowledge of accessibility (WCAG 2.1) standards.",
                    "jobs@pixelcraft.io",
                    "OPEN"
            );

            Job job3 = new Job(
                    "Backend Developer (Spring Boot & Microservices)",
                    "CloudScale Systems",
                    "Hyderabad, India",
                    "Full-time",
                    "Mid-level (2-4 yrs)",
                    "$75,000 - $95,000 / yr",
                    "Join our core platform engineering team to build scalable, event-driven microservices handling millions of daily events. You will design database schemas, write high-throughput APIs, and ensure system uptime.",
                    "Solid understanding of Core Java, OOP principles, and Spring Boot framework.\nExperience designing REST APIs and data modeling in PostgreSQL / MySQL.\nKnowledge of Kafka or RabbitMQ messaging systems.\nExperience with JUnit and Mockito unit testing.",
                    "hiring@cloudscale.net",
                    "OPEN"
            );

            Job job4 = new Job(
                    "DevOps & Cloud Infrastructure Engineer",
                    "Nexus Global",
                    "Remote",
                    "Remote",
                    "Senior (4+ yrs)",
                    "$120,000 - $145,000 / yr",
                    "We need an experienced DevOps Engineer to manage our cloud infrastructure, automate deployment pipelines, and maintain high system security and reliability across multi-cloud environments.",
                    "Expertise in AWS or GCP cloud architectures.\nStrong scripting skills in Bash / Python.\nProficiency in Terraform, Docker, and Kubernetes.\nExperience setting up monitoring with Prometheus and Grafana.",
                    "devops-talent@nexusglobal.com",
                    "OPEN"
            );

            Job job5 = new Job(
                    "UI/UX Product Designer",
                    "DesignSphere",
                    "Mumbai, India",
                    "Part-time",
                    "Mid-level (2+ yrs)",
                    "$45,000 - $60,000 / yr",
                    "DesignSphere is seeking a visionary Product Designer who can turn complex enterprise workflows into simple, elegant, and intuitive user experiences.",
                    "Strong portfolio showcasing web and mobile product design.\nMastery of Figma, wireframing, and interactive prototyping.\nAbility to conduct user research, usability testing, and persona building.\nCollaboration skills working directly with frontend developers.",
                    "talent@designsphere.co",
                    "OPEN"
            );

            Job job6 = new Job(
                    "Software Engineering Intern (Summer 2026)",
                    "Apex Innovations",
                    "Bangalore, India",
                    "Internship",
                    "Entry-level",
                    "$25,000 - $35,000 / yr",
                    "Kickstart your software engineering career with Apex Innovations! You will be paired with a senior mentor, contribute to production codebases, and participate in real sprint planning and code reviews.",
                    "Pursuing a degree in Computer Science, Software Engineering, or related field.\nFamiliarity with Java, Python, or JavaScript.\nBasic understanding of relational databases and Git.\nEager to learn, solve problems, and communicate effectively.",
                    "interns@apexinnovations.org",
                    "OPEN"
            );

            jobRepository.saveAll(Arrays.asList(job1, job2, job3, job4, job5, job6));

            // Add sample applications for job1 and job2
            Application app1 = new Application(
                    job1,
                    "Aarav Sharma",
                    "aarav.sharma@example.com",
                    "+91 98765 43210",
                    5,
                    "https://github.com/aarav-sharma",
                    "I have 5 years of experience building high-scale Spring Boot microservices and React dashboards. I'd love to bring my expertise to TechCorp.",
                    "SHORTLISTED"
            );

            Application app2 = new Application(
                    job1,
                    "Priya Patel",
                    "priya.patel@example.com",
                    "+91 91234 56789",
                    6,
                    "https://linkedin.com/in/priya-patel-dev",
                    "Extensive background in enterprise Java and cloud-native solutions. Experienced with PostgreSQL tuning and distributed caching.",
                    "UNDER_REVIEW"
            );

            Application app3 = new Application(
                    job2,
                    "David Miller",
                    "david.m@example.com",
                    "+1 415-555-0199",
                    3,
                    "https://davidmiller.dev",
                    "Passionate frontend developer obsessed with clean UI, responsive design, and smooth animations. Excited about PixelCraft's vision!",
                    "APPLIED"
            );

            applicationRepository.saveAll(Arrays.asList(app1, app2, app3));
        }
    }
}

