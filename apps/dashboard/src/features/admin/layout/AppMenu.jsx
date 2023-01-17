import { IconDashboard } from "~/components/icons/IconDashboard";
import { IconPinFill } from "~/components/icons/IconPinFill";
import { IconBookOpen } from "~/components/icons/IconBookOpen";
import { IconUserBox } from "~/components/icons/IconUserBox";
import { IconLineDuotone } from "~/components/icons/IconLineDuotone";
import { IconPressure } from "~/components/icons/IconPressure";
import { IconLamp } from "~/components/icons/IconLamp";
import { IconSortAlfa } from "~/components/icons/IconSortAlfa";
import { IconStackFrame } from "~/components/icons/IconStackFrame";
import { IconCalendarAdd } from "~/components/icons/IconCalendarAdd";
import { IconLineAlt } from "~/components/icons/IconLineAlt";
import { IconChatSearch } from "~/components/icons/IconChatSearch";
import { IconMallBag } from "~/components/icons/IconMallBag";
import { IconSettingLine } from "~/components/icons/IconSettingLine";
import { IconBookmark } from "~/components/icons/IconBookmark";
import IconCore from "../../../components/icons/IconCore";
import IconCatalog from "../../../components/icons/IconCatalog";
import IconChecklist from "../../../components/icons/IconChecklist";
import IconInspection from "../../../components/icons/IconInspection";
import IconSubregion from "../../../components/icons/IconSubregion";
import IconSupplierType from "../../../components/icons/IconSupplierType";
import IconIndustriType from "../../../components/icons/IconIndustriType";
import IconServices from "../../../components/icons/IconServices";
import IconProductLines from "../../../components/icons/IconProductLines";
import IconProductCat from "../../../components/icons/IconProductCat";
import IconSubCategory from "../../../components/icons/IconSubCategory";
import IconProduct from "../../../components/icons/IconProduct";
import IconDefectCategory from "../../../components/icons/IconDefectCategory";
import IconPriceOverview from "../../../components/icons/IconPriceOverview";
import IconSampleSize from "../../../components/icons/IconSampleSize";
import IconManday from "../../../components/icons/IconManday";
import IconChecklistType from "../../../components/icons/IconChecklistType";
import IconQuestion from "../../../components/icons/IconQuestion";
import IconQuantity from "../../../components/icons/IconQuantity";
import IconWeightChart from "../../../components/icons/IconWeightChart";
import IconSize from "../../../components/icons/IconSize";
import IconWorkmanship from "../../../components/icons/IconWorkmanship";
import IconReport from "../../../components/icons/IconReport";

export const productInspectionLinks = [
    {
        isCollapsible: true,
        to: "/admin/product-inspection",
        icon: <IconCore />,
        collapsibleName: 'Core',
        list: [
            {
                icon: <IconDashboard />,
                label: "Countries",
                to: "/admin/product-inspection/countries",
            },
            {
                icon: <IconPinFill />,
                label: "Province",
                to: "/admin/product-inspection/province",
            },
            {
                icon: <IconSubregion />,
                label: "Sub Region",
                to: "/admin/product-inspection/sub-region",
            },
            {
                icon: <IconBookOpen />,
                label: "Cities",
                to: "/admin/product-inspection/cities",
            },
            {
                icon: <IconUserBox />,
                label: "Users",
                to: "/admin/product-inspection/users",
            },
        ]
    },
    {
        isCollapsible: true,
        icon: <IconCatalog />,
        collapsibleName: 'Catalog',
        list: [
            {
                icon: <IconSupplierType />,
                label: "Supplier Type",
                to: "/admin/product-inspection/supplier-type",
            },
            {
                icon: <IconIndustriType />,
                label: "Industri Type",
                to: "/admin/product-inspection/industri-type",
            },
            {
                icon: <IconServices />,
                label: "Services Type",
                to: "/admin/product-inspection/services-type",
            },
            {
                icon: <IconProductLines />,
                label: "Product Lines",
                to: "/admin/product-inspection/product-lines",
            },
            {
                icon: <IconProductCat />,
                label: "Product Category",
                to: "/admin/product-inspection/product-category",
            },
            {
                icon: <IconSubCategory />,
                label: "Sub Category",
                to: "/admin/product-inspection/subcategory",
            },
            {
                icon: <IconProduct />,
                label: "Products",
                to: "/admin/product-inspection/products",
            },
            {
                icon: <IconDefectCategory />,
                label: "Defect Category",
                to: "/admin/product-inspection/defect-category",
            },
            {
                icon: <IconLamp />,
                label: "Defect Items",
                to: "/admin/product-inspection/defect-items",
            },
            {
                icon: <IconLineDuotone />,
                label: "Defect Level",
                to: "/admin/product-inspection/defect-level",
            },
            {
                icon: <IconPriceOverview />,
                label: "Price Overview",
                to: "/admin/product-inspection/price-overview",
            },
            {
                icon: <IconSampleSize />,
                label: "Sample Size",
                to: "/admin/product-inspection/sample-size",
            },
            {
                icon: <IconManday />,
                label: "Manday Size",
                to: "/admin/product-inspection/manday-size",
            },
        ]
    },
    {
        isCollapsible: true,
        icon: <IconChecklist />,
        collapsibleName: 'Checklist',
        list: [
            {
                icon: <IconChecklistType />,
                label: "Checklist Chapter Type",
                to: "/admin/product-inspection/checklist-chapter-type",
            },
            {
                icon: <IconLineAlt />,
                label: "Inspection Chapter",
                to: "/admin/product-inspection/inspection-chapter",
            },
            {
                icon: <IconQuestion />,
                label: "Inspection Question",
                to: "/admin/product-inspection/inspection-question",
            },
            {
                icon: <IconQuantity />,
                label: "Quantity",
                to: "/admin/product-inspection/quantity",
            },
            {
                icon: <IconWeightChart />,
                label: "Weight Chart",
                to: "/admin/product-inspection/weight-chart",
            },
            {
                icon: <IconSize />,
                label: "Size Measurement",
                to: "/admin/product-inspection/size-measurement",
            },
            {
                icon: <IconWorkmanship />,
                label: "Workmanship",
                to: "/admin/product-inspection/workmanship",
            },
            // {
            //     icon: <IconPressure />,
            //     label: "Point of Measurement",
            //     to: "/admin/product-inspection/point-of-measurement",
            // },
            // {
            //     icon: <IconSortAlfa />,
            //     label: "Product Sizes",
            //     to: "/admin/product-inspection/product-sizes",
            // },
            // {
            //     icon: <IconStackFrame />,
            //     label: "Supplier Type",
            //     to: "/admin/product-inspection/supplier-type",
            // },
            // {
            //     icon: <IconCalendarAdd />,
            //     label: "Inspection Type",
            //     to: "/admin/product-inspection/inspection-type",
            // },
            
        ]
    },
    {
        isCollapsible: true,
        icon: <IconInspection />,
        collapsibleName: 'Inspection',
        list: [
            {
                icon: <IconMallBag />,
                label: "Inspection Orders",
                to: "/admin/product-inspection/inspection-order",
            },
            {
                icon: <IconChatSearch />,
                label: "Checklist Question",
                to: "/admin/product-inspection/inspection",
            },
            {
                icon: <IconSettingLine />,
                label: "Services",
                to: "/admin/product-inspection/services",
            },
            {
                icon: <IconReport />,
                label: "Report",
                to: "/admin/product-inspection/report",
            },
        ]
    }
    
    
    
    
    // {
    //    icon: <RiLogoutBoxLine color="gray" size={16} />,
    //    label: "Logout",
    //    // command: handleLogout,
    //    to: "/admin/product-inspection/",
    // },
];
