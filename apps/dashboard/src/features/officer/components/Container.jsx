import { classNames } from 'primereact/utils'

export function Container({ children, className }) {
    return (
        <div className={classNames('mx-auto md:w-[360px] mobile-container relative', className)}>
            {children}
        </div>
    );
}

export function MobileContainer({ children, className }) {
    return (
        <Container className={classNames("px-[24px]", className)}>{children}</Container>
    )
}
