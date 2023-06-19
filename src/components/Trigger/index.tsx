import { useEffect, useRef, FC, ReactNode } from "react";

interface Props {
  onTrigger: () => void
  children?: ReactNode
  className?: string
}

const Trigger: FC<Props> = ({ onTrigger, children, className }) => {
    const triggerRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                onTrigger();
            }
        });
        if(triggerRef.current) {
            observer.observe(triggerRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [onTrigger, triggerRef.current]);
    return <div ref={triggerRef} className={className}>{children}</div>;
};

export default Trigger;