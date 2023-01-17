import { Outlet, useNavigate } from "react-router-dom";
import { Container, MobileContainer } from "../components/Container";
import { IconArrowLeft } from "~/components/icons/IconArrowLeft";

export function OfficerLayoutWithBackButton({ children, title, backUrl }) {
    const navigate = useNavigate()

    return (
        <Container className="shadow-lg relative h-screen flex flex-col overflow-x-hidden">
            <header
                className="shadow-[0px_4px_12px_rgba(36,35,35,0.05)] bg-white sticky top-0 z-10"
            >
                <MobileContainer className="flex items-center justify-between py-[16px]">
                    <div className="flex items-center gap-[8px]">
                        <button
                            className="text-blue-4"
                            aria-label="back"
                            onClick={() => navigate(backUrl || -1)}
                        >
                            <IconArrowLeft />
                        </button>
                        <h1 className="text-[14px] font-bold">{title}</h1>
                    </div>
                </MobileContainer>
            </header>
            <main className="mt-[16px] mb-[16px] bg-[rgba(233,238,247,0.1)]">
                {children || <Outlet />}
            </main>
        </Container>
    )
}