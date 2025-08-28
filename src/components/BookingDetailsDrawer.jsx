import React, { useMemo } from "react";
import Drawer from "./Drawer";
import image from "../assets/4c1a900b3b3e49a09cbd22efaee47a0cec00b79a.jpg";

const BookingDetailsDrawer = ({ isOpen, onClose }) => {
    // Hardcoded demo data
    const data = useMemo(
        () => ({
            professional: {
                name: "Jonas Blong",
                email: "jonasblong@gmail.com",
                avatar: image,
            },
            client: {
                name: "Jonas Blong",
                email: "jonasblong@gmail.com",
                avatar: image,
            },
            bookingId: "NBO234",
            bookingDateTime: "08 Sept 2025, 01:40pm",
            location: "8 moninotc street, Toronto Canada",
            amount: "$500",
            payment: "Subscription",
            paymentMethod: "Subscription",
            status: "Completed",
        }),
        []
    );

    return (
        <Drawer isOpen={isOpen} onClose={onClose} title="Booking Details" width="half" position="right">
            <div className="h-[100px] flex items-center justify-between bg-[#4285F4]/10 px-10">
                <h3 className="text-2xl font-normal text-black">Booking Details</h3>
                <span className="text-3xl font-light text-black" onClick={onClose}>X</span>
            </div>
            {/* Top two-column: Professional and Client */}
            <div className="bg-white">
                <div className="flex justify-center gap-6 items-center">
                    {/* Professional */}
                    <div className="py-4 px-6">
                        <p className="text-[22px] font-semibold mb-3">Professional</p>
                        <div className="flex flex-col items-center">
                            <img src={data.professional.avatar} alt={data.professional.name} className="w-[70px] h-[70px] rounded-full border" />
                            <p className="mt-3 text-xl font-medium">{data.professional.name}</p>
                            <p className="text-base text-[#121212]/50">{data.professional.email}</p>
                        </div>
                    </div>
                    {/* Divider */}
                    <div className="hidden sm:block h-full w-[0.5px] bg-[#121212]/60 min-h-[150px]" />


                    {/* Client */}
                    <div className="py-4 px-6">
                        <p className="text-[22px] font-semibold mb-3">Client</p>
                        <div className="flex flex-col items-center">
                            <img src={data.client.avatar} alt={data.client.name} className="w-[70px] h-[70px] rounded-full border" />
                            <p className="mt-3 text-xl font-medium">{data.client.name}</p>
                            <p className="text-base text-[#121212]/50">{data.client.email}</p>
                        </div>
                    </div>
                </div>

                <hr className="w-full h-[1px] bg-[#121212]/50" />

                {/* Rows */}
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="py-4 px-6">
                            <p className="text-[#121212]/50 text-xl font-medium">Booking ID</p>
                            <p className="text-xl font-semibold">{data.bookingId}</p>
                        </div>
                        <div className="py-4 px-6">
                            <p className="text-[#121212]/50 text-xl font-medium">Booking Date and Time</p>
                            <p className="text-xl font-semibold">{data.bookingDateTime}</p>
                        </div>
                    </div>

                    <hr className="w-full h-[1px] bg-[#121212]/50" />

                    <div className="py-4 px-6">
                        <p className="text-[#121212]/50 text-xl font-medium">Location</p>
                        <p className="text-xl font-semibold">{data.location}</p>
                    </div>

                    <hr className="w-full h-[1px] bg-[#121212]/50" />

                    <div className="grid grid-cols-2 gap-6">
                        <div className="py-4 px-6">
                            <p className="text-[#121212]/50 text-xl font-medium">Amount</p>
                            <p className="text-xl font-semibold">{data.amount}</p>
                        </div>
                        <div className="py-4 px-6">
                            <p className="text-[#121212]/50 text-xl font-medium">Payment</p>
                            <p className="text-xl font-semibold">{data.payment}</p>
                        </div>
                    </div>

                    <hr className="w-full h-[1px] bg-[#121212]/50" />

                    <div className="grid grid-cols-2 gap-6">
                        <div className="py-4 px-6">
                            <p className="text-[#121212]/50 text-xl font-medium">Payment Method</p>
                            <p className="text-xl font-semibold">{data.paymentMethod}</p>
                        </div>
                        <div className="py-4 px-6">
                            <p className="text-[#121212]/50 text-xl font-medium">Status</p>
                            <span className="inline-flex items-center px-3 py-1 rounded-md bg-green-100 text-green-700 text-sm font-medium w-fit">
                                {data.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default BookingDetailsDrawer;
