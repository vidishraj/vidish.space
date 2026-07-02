import {motion} from 'framer-motion';
import Code2 from '/assets/contacts/code-xml.png';
import Linkedin from '/assets/contacts/linkedin.png';
import Mail from '/assets/contacts/mail.png';
import Github from '/assets/contacts/github.png';
import Resume from '/assets/contacts/file-user.png';
import resumePDF from '/assets/Resume_SDE_Vidish_Raj.pdf'
import {useThemeContext} from '../App';

const SocialLinks = () => {
    const {season, palette} = useThemeContext();
    const isMonsoon = season === 'monsoon';

    const socialLinks = [
        {name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/vidishraj', color: '#0077B5'},
        {name: 'GitHub', icon: Github, url: 'https://github.com/vidishraj', color: '#333'},
        {name: 'LeetCode', icon: Code2, url: 'https://leetcode.com/vidishraj', color: '#FFA116'},
        {name: 'Gmail', icon: Mail, url: 'mailto:vidishraj@gmail.com', color: '#EA4335'},
    ];

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {staggerChildren: 0.2}},
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
    };

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = resumePDF;
        link.download = 'vidish_raj_resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const isWinter = season === 'winter';
    const isSummer = season === 'summer';
    const linkBg = isMonsoon ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200';
    const linkBorder = isSummer ? '1px solid rgba(0,0,0,0.12)' : undefined;
    const iconBgStyle = {background: isMonsoon ? 'white' : ''};
    const iconFilter = isMonsoon ? 'brightness(1.2)' : 'none';

    const containerBorder = isMonsoon
        ? '1px solid rgba(91, 155, 213, 0.2)'
        : isWinter
            ? '1px solid rgba(59, 130, 200, 0.15)'
            : '1px solid rgba(180, 140, 80, 0.15)';

    const containerShadow = isMonsoon
        ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
        : isWinter
            ? '0 8px 32px rgba(30, 60, 120, 0.15), inset 0 1px 0 rgba(255,255,255,0.6)'
            : '0 8px 32px rgba(120, 80, 20, 0.1), inset 0 1px 0 rgba(255,255,255,0.7)';

    return (
        <div className="w-full flex justify-center items-center py-8">
            <motion.div
                className={`flex flex-wrap justify-center gap-6 p-8 rounded-2xl max-w-2xl mx-auto`}
                style={{
                    backgroundColor: palette.contactLinkBg,
                    border: containerBorder,
                    boxShadow: containerShadow,
                    backdropFilter: 'blur(12px)',
                }}
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
                        className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${linkBg}`}
                        style={{border: linkBorder}}
                        variants={itemVariants}
                        whileHover="hover"
                        whileTap="tap"
                        aria-label={`Visit my ${link.name}`}
                    >
                        <motion.div
                            className="p-3 rounded-full mb-2 flex items-center justify-center"
                            style={iconBgStyle}
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
                                style={{filter: iconFilter}}
                            />
                        </motion.div>
                        <span className="text-sm font-medium" style={{color: palette.textPrimary}}>
                            {link.name}
                        </span>
                    </motion.a>
                ))}
                <motion.button
                    key={"resume"}
                    type="button"
                    onClick={downloadResume}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors border border-transparent hover:border-transparent ${linkBg}`}
                    style={{border: linkBorder}}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label={`Download my Resume`}
                >
                    <motion.div
                        className="p-3 rounded-full mb-2 flex items-center justify-center"
                        style={iconBgStyle}
                        initial={{rotate: 0}}
                        whileHover={{
                            rotate: [0, -10, 10, -10, 10, 0],
                            transition: {duration: 0.5}
                        }}
                    >
                        <img
                            src={Resume}
                            alt=""
                            aria-hidden="true"
                            className="w-6 h-6 object-contain"
                            style={{filter: iconFilter}}
                        />
                    </motion.div>
                    <span className="text-sm font-medium" style={{color: palette.textPrimary}}>
                        Resume
                    </span>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default SocialLinks;
