import { Footer } from "@/components/footer";

const LandingLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="bg-white">
            {children}
        </div>
    )
}

export default LandingLayout;