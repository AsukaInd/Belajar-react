import { lazy } from "react";
import { LazyLoad } from "~/components/LazyLoad";
// import { ProtectedRoute } from "~/features/auth/ProtectedRoute";
import { useAuth } from "~/features/auth/useAuth";
import { AdminLayout } from "../../layout/AdminLayout";
import DefectItems from "../pages/catalog/DefectItems";
import PointOfMeasurement from "../pages/catalog/PointOfMeasurement";
import { ProtectedRoute } from "~/features/auth/ProtectedRoute";
import ProductSizes from "../pages/catalog/ProductSizes";
import Countries from "../pages/core/Countries";
import Province from "../pages/core/Province";
import Chapter from "../components/inspection/Chapter";
import ChapterDetail from "../pages/inspection/ChapterDetail";
import ChapterQuestion from "../pages/inspection/ChapterQuestion";
import ChapterAdd from "../pages/inspection/ChapterAdd";
import Inspection from "../pages/inspection/Inspection";
import InspectionDetail from "../pages/inspection/InpectionDetail";
import AdminLogin from "../../../dashboard/routes/AdminLogin";
import Cities from "../pages/core/Cities";
import DefectLevel from "../pages/catalog/DefectLevel";
import TypeInspection from "../pages/inspection/TypeInspection";
import Customer from "../pages/core/Customer";
import ServicesPage from "../pages/services/Services";
import AddEditService from "../pages/services/addEditService";
import Products from "../pages/catalog/Products";
import apiCountry from "../api/teritory/apiCountry";
import { tokenStorage } from "~/utils/tokenStorage";
import SupplierType from "../pages/catalog/SupplierType";
import OrderPage from "../pages/inspection/OrderPage";
import CreateOrderPage from "../pages/inspection/CreateOrderPage";
import SubRegion from "../pages/core/SubRegion";
import IndustryType from "../pages/catalog/IndustryType";
import ServicesType from "../pages/catalog/ServicesType";
import ProductLine from "../pages/catalog/ProductLine";
import ProductCategory from "../pages/catalog/ProductCategory";
import SubCategory from "../pages/catalog/SubCategory";
import DefectCategory from "../pages/catalog/DefectCategory";
import PriceOverview from "../pages/catalog/PriceOverview";
import SampleSize from "../pages/catalog/SampleSize";
import MandaySize from "../pages/catalog/MandaySize";
import ChecklistChapterType from "../pages/checklist/ChecklistChapterType";
import Quantity from "../pages/checklist/Quantity";
import WeightChart from "../pages/checklist/WeightChart";
import SizeMeasure from "../pages/checklist/SizeMeasure";
import WorkmanShip from "../pages/checklist/WorkmanShip";
import InspectionQuestion from "../pages/checklist/InspectionQuestion";
import InspectionDetail2 from "../pages/inspection/InspectionDetail2";
import Report from "../pages/inspection/Report";
const Dashboard = lazy(() => import("../pages/dashboard"));

export const productInspectionRoutes = [
    {
        path: "",
        element: (
            <LazyLoad>
                <Dashboard />
            </LazyLoad>
        ),
    },
    {
        path: "products",
        element: (
            <LazyLoad>
                <Products />
            </LazyLoad>
        ),
    },
    {
        path: "defect-level",
        element: (
            <LazyLoad>
                <DefectLevel />
            </LazyLoad>
        ),
    },
    {
        path: "defect-items",
        element: (
            <LazyLoad>
                <DefectItems />
            </LazyLoad>
        ),
    },
    {
        path: "point-of-measurement",
        element: (
            <LazyLoad>
                <PointOfMeasurement />
            </LazyLoad>
        ),
    },
    {
        path: "product-sizes",
        element: (
            <LazyLoad>
                <ProductSizes />
            </LazyLoad>
        ),
    },
    {
        path: "supplier-type",
        element: (
            <LazyLoad>
                <SupplierType />
            </LazyLoad>
        ),
    },
    {
        path: "countries",
        element: (
            <LazyLoad>
                <Countries />
            </LazyLoad>
        ),
    },
    {
        path: "cities",
        element: (
            <LazyLoad>
                <Cities />
            </LazyLoad>
        ),
    },
    {
        path: "industri-type",
        element: (
            <LazyLoad>
                <IndustryType />
            </LazyLoad>
        ),
    },
    {
        path: "services-type",
        element: (
            <LazyLoad>
                <ServicesType />
            </LazyLoad>
        ),
    },
    {
        path: "product-lines",
        element: (
            <LazyLoad>
                <ProductLine />
            </LazyLoad>
        ),
    },
    {
        path: "product-category",
        element: (
            <LazyLoad>
                <ProductCategory />
            </LazyLoad>
        ),
    },
    {
        path: "subcategory",
        element: (
            <LazyLoad>
                <SubCategory />
            </LazyLoad>
        ),
    },
    {
        path: "defect-category",
        element: (
            <LazyLoad>
                <DefectCategory />
            </LazyLoad>
        ),
    },
    {
        path: "price-overview",
        element: (
            <LazyLoad>
                <PriceOverview />
            </LazyLoad>
        ),
    },
    {
        path: "sample-size",
        element: (
            <LazyLoad>
                <SampleSize />
            </LazyLoad>
        ),
    },
    {
        path: "manday-size",
        element: (
            <LazyLoad>
                <MandaySize />
            </LazyLoad>
        ),
    },
    {
        path: "checklist-chapter-type",
        element: (
            <LazyLoad>
                <ChecklistChapterType />
            </LazyLoad>
        ),
    },
    {
        path: "quantity",
        element: (
            <LazyLoad>
                <Quantity />
            </LazyLoad>
        ),
    },
    {
        path: "users",
        element: (
            <LazyLoad>
                <Customer />
            </LazyLoad>
        ),
    },
    {
        path: "weight-chart",
        element: (
            <LazyLoad>
                <WeightChart />
            </LazyLoad>
        ),
    },
    {
        path: "size-measurement",
        element: (
            <LazyLoad>
                <SizeMeasure />
            </LazyLoad>
        ),
    },
    {
        path: "workmanship",
        element: (
            <LazyLoad>
                <WorkmanShip />
            </LazyLoad>
        ),
    },
    {
        path: "province",
        element: (
            <LazyLoad>
                <Province />
            </LazyLoad>
        ),
    },
    {
        path: "sub-region",
        element: (
            <LazyLoad>
                <SubRegion />
            </LazyLoad>
        ),
    },
    {
        path: "inspection-type",
        element: (
            <LazyLoad>
                <TypeInspection />
            </LazyLoad>
        ),
    },
    {
        path: "inspection-chapter",
        element: (
            <LazyLoad>
                <Chapter />
            </LazyLoad>
        ),
    },
    {
        path: "inspection-chapter/:id",
        element: (
            <LazyLoad>
                <ChapterDetail />
            </LazyLoad>
        ),
    },
    {
        path: "inspection-chapter/add",
        element: (
            <LazyLoad>
                <ChapterAdd />
            </LazyLoad>
        ),
    },
    {
        path: "inspection/",
        element: (
            <LazyLoad>
                <Inspection />
            </LazyLoad>
        ),
    },
    {
        path: "inspection-order",
        element: (
            <LazyLoad>
                <OrderPage />
            </LazyLoad>
        ),
    },
    {
        path: "report",
        element: (
            <LazyLoad>
                <Report />
            </LazyLoad>
        ),
    },
    {
        path: "inspection-order/add",
        element: (
            <LazyLoad>
                <CreateOrderPage />
            </LazyLoad>
        ),
    },
    {
        path: "inspection/:id",
        element: (
            <LazyLoad>
                <InspectionDetail2 />
            </LazyLoad>
        ),
    },
    {
        path: "inspection-question",
        element: (
            <LazyLoad>
                <InspectionQuestion />
            </LazyLoad>
        ),
    },
    {
        path: "services",
        element: (
            <LazyLoad>
                <ServicesPage />
            </LazyLoad>
        ),
    },
    {
        path: "services/:id",
        element: (
            <LazyLoad>
                <AddEditService />
            </LazyLoad>
        ),
    },
];
