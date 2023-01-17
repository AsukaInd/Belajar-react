import { Card } from "@/components/ui/Card";

export function DetailDescription({description}) {
    return (
        <div id="Description">
            <h1 className="text-[30px] font-bold mb-[34px]">About This Gig</h1>
            <Card className="p-[40px]">
                <p>{description}</p>
            </Card>
        </div>
    )
}