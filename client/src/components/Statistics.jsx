import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { Card, Typography, CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Statistics() {
  const [chartData, setChartData] = React.useState({
    categories: [],
    occupancyRates: [],
    revenues: [],
    designation: [],
    values: [],
    tenantAadhar: 0,
  });

  const [loading, setLoading] = React.useState(true);
  const userDetails = useSelector((state) => state.user.currentUser);
  const id = userDetails._id;
  const [udata, setUdata] = useState([]);
  const [xlabels, setxlabels] = useState([]);

  React.useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/vendor/getvendor/${id}`
        );
        const vendorData = response.data;
        const tenants = response.data[0]?.tenants || [];
        if(!vendorData && !tenants){
            alert('Please create a Listing First!')
            return;
        }else{
        const categories = vendorData.map((vendor) => vendor.name);
        const occupancyRates = vendorData.map((vendor) => {
          const totalRooms = vendor.totalRooms > 0 ? vendor.totalRooms : 0;
          const occupiedRooms = totalRooms - vendor.availRooms;
          return totalRooms > 0
            ? ((occupiedRooms / totalRooms) * 100).toFixed(2)
            : 0;
        });
        const revenues = vendorData.map((vendor) => {
          const totalRooms = vendor.totalRooms > 0 ? vendor.totalRooms : 0;
          return (totalRooms - vendor.availRooms) * vendor.rent;
        });

        const tenantAadhar = vendorData.reduce((sum, vendor) => {
          return (
            sum + (Array.isArray(vendor.tenants) ? vendor.tenants.length : 0)
          );
        }, 0);

        const designationCounts = tenants.reduce((acc, tenant) => {
          const designation = tenant.designation || "Unknown";
          acc[designation] = (acc[designation] || 0) + 1;
          return acc;
        }, {});

        setUdata(Object.values(designationCounts));
        setxlabels(Object.keys(designationCounts));

        setChartData({
          categories,
          occupancyRates,
          revenues,
          tenantAadhar,
          uData: Object.values(designationCounts),
          xLabels: Object.keys(designationCounts),
        });

        setLoading(false);
    }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
        setLoading(false);
      }
    };

    fetchVendorData();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Occupancy Rates */}
        <Card className="shadow-lg p-4 bg-white rounded-md">
          <Typography variant="h6" className="text-lg font-bold text-gray-800">
            Occupancy Rates
          </Typography>
          <BarChart
            xAxis={[
              {
                id: "vendorNames",
                data: chartData.categories,
                scaleType: "band",
                label: "Vendor Names",
              },
            ]}
            series={[
              {
                data: chartData.occupancyRates,
                label: "Occupancy Rate (%)",
                color: "#1fa52a", // Green
              },
            ]}
            width={500}
            height={300}
          />
        </Card>

        {/* Revenue Estimation */}
        <Card className="shadow-lg p-4 bg-white rounded-md">
          <Typography variant="h6" className="text-lg font-bold text-gray-800">
            Estimated Monthly Revenue
          </Typography>
          <BarChart
            xAxis={[
              {
                id: "vendorNames",
                data: chartData.categories,
                scaleType: "band",
                label: "Vendor Names",
              },
            ]}
            series={[
              {
                data: chartData.revenues,
                label: "Revenue (₹)",
                color: "#f3db56", // yellow
              },
            ]}
            width={500}
            height={300}
          />
        </Card>

        {/* Tenant Designations */}
        <Card className="shadow-lg p-4 bg-white rounded-md">
          <Typography variant="h6" className="text-lg font-bold text-gray-800">
            Tenant Designations
          </Typography>
          <BarChart
            width={500}
            height={300}
            series={[
              {
                data: udata,
                id: "designationId",
                stack: "total",
                color: "#6a5acd", // Amber
              },
            ]}
            xAxis={[
              { data: xlabels, scaleType: "band", label: "Designations" },
            ]}
          />
        </Card>

        {/* Tenant Aadhar Breakdown */}
        <Card className="shadow-lg p-4 bg-white rounded-md">
          <Typography variant="h6" className="text-lg font-bold text-gray-800">
            Tenant Aadhar Verification
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: chartData.tenantAadhar, label: "Verified" },
                  { id: 1, value: 2, label: "Unverified" },
                ],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                color: ["#4CAF50", "#F44336"], 
              },
            ]}
            width={500}
            height={300}
          />
        </Card>
      </div>
    </div>
  );
}
