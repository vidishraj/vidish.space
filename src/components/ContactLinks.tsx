import {motion} from 'framer-motion';
import Code2 from '/assets/contacts/code-xml.png';
import Linkedin from '/assets/contacts/linkedin.png';
import Instagram from '/assets/contacts/instagram.png';
import Mail from '/assets/contacts/mail.png';
import Github from '/assets/contacts/github.png';
import Resume from '/assets/contacts/file-user.png';
import resumePDF from '/assets/Resume_SDE_Vidish_Raj.pdf'
import { useThemeContext } from '../App';

const SocialLinks = () => {
    const { isDarkMode } = useThemeContext();

    // Social media links data
    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://linkedin.com/in/vidishraj',
            color: '#0077B5'
        },
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/vidishraj',
            color: '#333'
        },
        {
            name: 'LeetCode',
            icon: Code2,
            url: 'https://leetcode.com/vidishraj',
            color: '#FFA116'
        },
        {
            name: 'Gmail',
            icon: Mail,
            url: 'mailto:vidishraj@gmail.com',
            color: '#EA4335'
        },
        {
            name: 'Instagram',
            icon: Instagram,
            url: 'https://instagram.com/vidish.raj',
            color: '#E1306C'
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0
        }
    };

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = resumePDF;
        link.download = 'vidish_raj_resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
         <div className="w-full flex justify-center items-center py-8">
            <motion.div
                className={`flex flex-wrap justify-center gap-6 p-6 rounded-xl shadow-lg max-w-2xl mx-auto ${
                    isDarkMode
                        ? ''
                        : 'bg-white/90 shadow-gray-200/70'
                }`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {socialLinks.map((link) => (
                    <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
                            isDarkMode
                                ? 'bg-gray-700/80 hover:bg-gray-600'
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        variants={itemVariants}
                        whileHover="hover"
                        whileTap="tap"
                        aria-label={`Visit my ${link.name}`}
                    >
                        <motion.div
                            className={`p-3 rounded-full mb-2 flex items-center justify-center ${
                                isDarkMode
                                    ? 'bg-gray-800'
                                    : 'bg-white'
                            }`}
                            style={{
                                background: isDarkMode ? 'white' : ''
                            }}
                            initial={{rotate: 0}}
                            whileHover={{
                                rotate: [0, -10, 10, -10, 10, 0],
                                transition: {duration: 0.5}
                            }}
                        >
                            <img
                                src={link.icon}
                                alt={link.name}
                                className="w-6 h-6 object-contain"
                                style={{
                                    filter: isDarkMode ? 'brightness(1.2)' : 'none'
                                }}
                            />
                        </motion.div>
                        <span className={`text-sm font-medium ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                            {link.name}
                        </span>
                    </motion.a>
                ))}
                <motion.a
                    key={"resume"}
                    onClick={downloadResume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
                        isDarkMode
                            ? 'bg-gray-700/80 hover:bg-gray-600'
                            : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label={`Download my Resume`}
                >
                    <motion.div
                        className={`p-3 rounded-full mb-2 flex items-center justify-center ${
                            isDarkMode
                                ? 'bg-gray-800'
                                : 'bg-white'
                        }`}
                        style={{
                            background: isDarkMode ? 'white' : ''
                        }}
                        initial={{rotate: 0}}
                        whileHover={{
                            rotate: [0, -10, 10, -10, 10, 0],
                            transition: {duration: 0.5}
                        }}
                    >
                        <img
                            src={Resume}
                            alt={'Resume icon'}
                            className="w-6 h-6 object-contain"
                            style={{
                                filter: isDarkMode ? 'brightness(1.2)' : 'none'
                            }}
                        />
                    </motion.div>
                    <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                            Resume
                        </span>
                </motion.a>
            </motion.div>
        </div>
    );
};

export default SocialLinks;