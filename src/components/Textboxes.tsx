import {JSX} from "react";
import styles from "./TextBoxes.module.scss";
import {motion} from "framer-motion";

interface TextBoxProps {
    title: string;
    description: JSX.Element;
    image: string;
    className: string;
}

const TextBox: React.FC<TextBoxProps> = ({title, description, image, className}) => {
    return (
        <motion.div
            className={`${styles.textBox} ${styles[className]}`}
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
        >
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.description}>{description}</div>
            <img src={image} alt={title} className={styles.image}/>
        </motion.div>
    );
};

const TextBoxes: React.FC = () => {
    const boxes = [
        {
            id: 1,
            title: "School",
            description: (
                <>
                    <p><strong>Institution:</strong> PES University, Bengaluru</p>
                    <p><strong>Degree:</strong> B.Tech in Computer Science</p>
                    <p><strong>CGPA:</strong> 8.4</p>
                    <p><strong>Publication:</strong> IREAD: Interpretable Recognition and Automated Deconstruction of
                        Semantics in Written English</p>
                    <p><strong>Achievements:</strong> MDR Scholarship (2x), Distinction Award (2x)</p>
                </>
            ),
            image: "/assets/c3.svg",
        },
        {
            id: 2,
            title: "Internship",
            description: (
                <>
                    <p><strong>Company:</strong> PwC</p>
                    <p><strong>Role:</strong> Software Developer Intern</p>
                    <p>Developed an internal web application using Django, ReactJS, and MySQL.</p>
                    <p>Deployed the application on a Windows server using uWSGI and IIS.</p>
                    <p>Conducted code reviews to improve software stability.</p>
                    <p>Used Jira and Teams for project collaboration.</p>
                </>
            ),
            image: "/assets/c2.svg",
        },
        {
            id: 3,
            title: "Career",
            description: (
                <>
                    <p><strong>Role:</strong> Software Engineer</p>
                    <ul style={{textAlign: 'left'}}>
                        <h4>Backend Development:</h4>
                        <li>Building scalable microservices using Spring Boot, Python, and PostgreSQL</li>
                        <li>Implementing data pipelines with Databricks and Apache Spark</li>
                    </ul>
                    <ul style={{textAlign: 'left'}}>
                        <h4>Frontend & Architecture:</h4>
                        <li>Developing ReactJS-based dashboards and applications</li>
                        <li>Leading UI/UX optimizations for better user experience</li>
                    </ul>
                    <ul style={{textAlign: 'left'}}>
                        <h4>Cloud & DevOps:</h4>
                        <li>Creating CI/CD pipelines using Jenkins, Docker, and Kubernetes</li>
                        <li>Deploying solutions on AWS (ECR, ECS, Lambda, S3, RDS)</li>
                    </ul>
                    <ul style={{textAlign: 'left'}}>
                        <h4>Cross-Team Collaboration:</h4>
                        <li>Working in an Agile environment to deliver high-impact solutions</li>
                        <li>Engaging in code reviews, documentation, and mentorship</li>
                    </ul>
                </>
            ),
            image: "/assets/c1.svg",
        },
    ];

    return (
        <div className={styles.container}>
            {boxes.map((box) => (
                <TextBox key={box.id} className={`box${box.id}`} {...box} />
            ))}
        </div>
    );
};

export default TextBoxes;
