"use client";

import { useEffect, useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

interface TimelineItem {
    title: string;
    subtitle: string;
    date: string;
    description: string;
    bulletPoints?: string[];
}

interface SkillItem {
    name: string;
    percentage: number;
}

export default function ResumeTab() {
    const experiences: TimelineItem[] = [
        {
            title: "Web Developer Intern",
            subtitle: "Eskalate",
            date: "2024 – 2025",
            description: "",
            bulletPoints: [
                "Developed web applications using Next.js, ensuring optimal performance and scalability.",
                "Implemented secure state management using Redux.",
                "Integrated NextAuth for secure and seamless user authentication.",
                "Built and consumed RESTful APIs, facilitating data transfer between frontend and backend services.",
                "Conducted unit and integration testing using Jest and Cypress to ensure application code quality and reliability.",
            ],
        },
    ];

    const education: TimelineItem[] = [
        {
            title: "BSc in Computer Science and Engineering",
            subtitle: "Adama Science and Technology University",
            date: "2022 – 2026",
            description:
                "Relevant Coursework: Advanced Networking, Database Systems, Object-Oriented Programming, Operating Systems, Data Structures, Algorithms, and Machine Learning.",
        },
        {
            title: "Data Structure, Algorithms & Software Dev",
            subtitle: "Africa to Silicon Valley (A2SV)",
            date: "2024 – 2025",
            description:
                "A2SV is an academy and incubator that empowers high-potential African students with rigorous software engineering training, preparing them for top tech companies.",
            bulletPoints: [
                "Completed a year-long competitive programming training, solving 400+ problems on LeetCode and Codeforces combined.",
                "Acquired advanced frontend and backend development skills.",
                "Practiced team leadership, agile methodologies, and project management.",
            ],
        },
    ];

    const skills: SkillItem[] = [
        { name: "JavaScript / TypeScript", percentage: 85 },
        { name: "Next.js / React", percentage: 90 },
        { name: "Java / Spring Boot", percentage: 85 },
        { name: "Python", percentage: 75 },
        { name: "PostgreSQL / MariaDB / MySQL", percentage: 80 },
        { name: "Docker", percentage: 75 },
        { name: "Git / GitHub", percentage: 90 },
        { name: "Postman & API Testing", percentage: 85 },
    ];

    const [animated, setAnimated] = useState(false);

    // Trigger skill bar filling animation on mount
    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 150);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            id="resume-panel"
            role="tabpanel"
            className="flex flex-col gap-10 animate-fadeIn"
        >
            {/* Page Title */}
            <section className="flex flex-col gap-4">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-text-heading relative inline-block">
                    Career Snapshot
                    <span className="absolute -bottom-1.5 left-0 w-16 h-1 rounded bg-linear-to-r from-mint-primary to-mint-secondary shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                </h1>
            </section>

            {/* Experience & Education Timelines */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Experience Section */}
                <section className="flex flex-col gap-6">
                    <h2 className="text-lg md:text-xl font-bold font-heading text-text-heading flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-mint-primary/10 flex items-center justify-center text-mint-light">
                            <Briefcase size={18} />
                        </div>
                        <span>Experience</span>
                    </h2>
                    <div className="relative pl-6 border-l border-mint-primary/10 flex flex-col gap-8">
                        {experiences.map((exp, idx) => (
                            <div
                                key={idx}
                                className="relative flex flex-col gap-2"
                            >
                                {/* Timeline Node Dot */}
                                <div className="absolute -left-7.25 top-1.5 w-2.5 h-2.5 rounded-full bg-mint-primary border border-bg-base shadow-[0_0_8px_rgba(16,185,129,0.8)]" />

                                <h3 className="text-base font-bold text-text-heading leading-snug">
                                    {exp.title}
                                </h3>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
                                    <span className="font-semibold text-mint-light">
                                        {exp.subtitle}
                                    </span>
                                    <span className="text-text-muted font-medium">
                                        {exp.date}
                                    </span>
                                </div>
                                {exp.description && (
                                    <p className="text-xs md:text-sm text-text-body leading-relaxed mt-1">
                                        {exp.description}
                                    </p>
                                )}
                                {exp.bulletPoints &&
                                    exp.bulletPoints.length > 0 && (
                                        <ul className="list-disc pl-4 text-xs md:text-sm text-text-body leading-relaxed space-y-1.5 mt-1">
                                            {exp.bulletPoints.map((bp, i) => (
                                                <li key={i}>{bp}</li>
                                            ))}
                                        </ul>
                                    )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education Section */}
                <section className="flex flex-col gap-6">
                    <h2 className="text-lg md:text-xl font-bold font-heading text-text-heading flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-mint-primary/10 flex items-center justify-center text-mint-light">
                            <GraduationCap size={18} />
                        </div>
                        <span>Education</span>
                    </h2>
                    <div className="relative pl-6 border-l border-mint-primary/10 flex flex-col gap-8">
                        {education.map((edu, idx) => (
                            <div
                                key={idx}
                                className="relative flex flex-col gap-2"
                            >
                                {/* Timeline Node Dot */}
                                <div className="absolute -left-7.25 top-1.5 w-2.5 h-2.5 rounded-full bg-mint-primary border border-bg-base shadow-[0_0_8px_rgba(16,185,129,0.8)]" />

                                <h3 className="text-base font-bold text-text-heading leading-snug">
                                    {edu.title}
                                </h3>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
                                    <span className="font-semibold text-mint-light">
                                        {edu.subtitle}
                                    </span>
                                    <span className="text-text-muted font-medium">
                                        {edu.date}
                                    </span>
                                </div>
                                <p className="text-xs md:text-sm text-text-body leading-relaxed mt-1">
                                    {edu.description}
                                </p>
                                {edu.bulletPoints &&
                                    edu.bulletPoints.length > 0 && (
                                        <ul className="list-disc pl-4 text-xs md:text-sm text-text-body leading-relaxed space-y-1.5 mt-1">
                                            {edu.bulletPoints.map((bp, i) => (
                                                <li key={i}>{bp}</li>
                                            ))}
                                        </ul>
                                    )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Skills Section */}
            <section className="flex flex-col gap-6">
                <h2 className="text-lg md:text-xl font-bold font-heading text-text-heading">
                    My Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 p-6 rounded-xl bg-bg-base/20 border border-mint-primary/5">
                    {skills.map((skill, idx) => (
                        <div key={idx} className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between text-xs font-semibold">
                                <span className="text-text-body">
                                    {skill.name}
                                </span>
                                <span className="text-mint-light">
                                    {skill.percentage}%
                                </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-bg-base border border-mint-primary/5 overflow-hidden">
                                <div
                                    style={{
                                        width: animated
                                            ? `${skill.percentage}%`
                                            : "0%",
                                    }}
                                    className="h-full bg-linear-to-r from-mint-primary to-mint-secondary shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all duration-1000 ease-out"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
