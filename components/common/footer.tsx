import CamHamCard from "./cam";
const Footer = () => {
    return (
        <footer className="flex flex-col bg-base-100 text-secondary p-4 md:p-6 lg:p-8 justify-center items-center">
            <CamHamCard />
            <p className="text-sm md:text-base lg:text-lg text-center">
                2024 Art Roam.
            </p>
        </footer>
    );
};

export default Footer;
