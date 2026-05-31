#!/bin/bash
API="${1:-http://localhost:8090/api/v1}"

echo "🏢 Creating Branches..."
curl -s -X POST "$API/branches" -H "Content-Type: application/json" \
  -d '{"branchName":"Mumbai Central","branchLocation":"Mumbai, Maharashtra","contactPhone":"+91 98XXX43210","contactEmail":"mumbai@rentwheels.com","description":"Our flagship branch in the heart of Mumbai"}'
echo ""
curl -s -X POST "$API/branches" -H "Content-Type: application/json" \
  -d '{"branchName":"Delhi Hub","branchLocation":"New Delhi, Delhi","contactPhone":"+91 98XXX43211","contactEmail":"delhi@rentwheels.com","description":"Covering all of NCR region"}'
echo ""
curl -s -X POST "$API/branches" -H "Content-Type: application/json" \
  -d '{"branchName":"Bangalore Tech Park","branchLocation":"Bangalore, Karnataka","contactPhone":"+91 98XXX43212","contactEmail":"bangalore@rentwheels.com","description":"Serving the Silicon Valley of India"}'
echo ""
curl -s -X POST "$API/branches" -H "Content-Type: application/json" \
  -d '{"branchName":"Ahmedabad City","branchLocation":"Ahmedabad, Gujarat","contactPhone":"+91 98XXX43213","contactEmail":"ahmedabad@rentwheels.com","description":"Premium rentals in the city of heritage"}'
echo ""
curl -s -X POST "$API/branches" -H "Content-Type: application/json" \
  -d '{"branchName":"Pune Station","branchLocation":"Pune, Maharashtra","contactPhone":"+91 98XXX43214","contactEmail":"pune@rentwheels.com","description":"Your ride partner in Pune"}'
echo ""
echo "✅ 5 Branches created"
echo ""

echo "🚗 Adding Vehicles..."
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Mumbai Central","vehicleName":"Maruti Swift","vehicleType":"Car","pricePerHour":120,"count":3,"description":"Compact and fuel efficient"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Mumbai Central","vehicleName":"Hyundai Creta","vehicleType":"SUV","pricePerHour":250,"count":2,"description":"Spacious SUV for family trips"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Mumbai Central","vehicleName":"Royal Enfield Classic 350","vehicleType":"Bike","pricePerHour":80,"count":4,"description":"The legendary cruiser bike"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Delhi Hub","vehicleName":"Honda City","vehicleType":"Sedan","pricePerHour":200,"count":2,"description":"Premium sedan with smooth ride"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Delhi Hub","vehicleName":"Toyota Fortuner","vehicleType":"SUV","pricePerHour":400,"count":2,"description":"Powerful SUV for all terrains"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Delhi Hub","vehicleName":"Ola S1 Pro","vehicleType":"Scooter","pricePerHour":50,"count":5,"description":"Eco-friendly electric scooter"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Bangalore Tech Park","vehicleName":"Tata Nexon","vehicleType":"SUV","pricePerHour":220,"count":3,"description":"Safe and stylish compact SUV"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Bangalore Tech Park","vehicleName":"KTM Duke 200","vehicleType":"Bike","pricePerHour":100,"count":3,"description":"Sporty street bike"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Bangalore Tech Park","vehicleName":"Mercedes E-Class","vehicleType":"Luxury","pricePerHour":800,"count":1,"description":"Ultimate luxury sedan"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Ahmedabad City","vehicleName":"Maruti Ertiga","vehicleType":"Van","pricePerHour":180,"count":2,"description":"7-seater for group travel"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Ahmedabad City","vehicleName":"Tata Ace","vehicleType":"Truck","pricePerHour":300,"count":2,"description":"Light commercial vehicle"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Ahmedabad City","vehicleName":"Honda Activa","vehicleType":"Scooter","pricePerHour":40,"count":6,"description":"Most popular scooter"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Pune Station","vehicleName":"Hyundai i20","vehicleType":"Car","pricePerHour":150,"count":3,"description":"Premium hatchback"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Pune Station","vehicleName":"Mahindra Thar","vehicleType":"SUV","pricePerHour":350,"count":1,"description":"Off-road adventure beast"}'
echo ""
curl -s -X POST "$API/vehicles" -H "Content-Type: application/json" \
  -d '{"branchName":"Pune Station","vehicleName":"Volvo Bus","vehicleType":"Bus","pricePerHour":1500,"count":1,"description":"44-seater luxury tour bus"}'
echo ""
echo "✅ 15 Vehicles added"
echo ""

echo "📅 Creating Bookings..."
curl -s -X POST "$API/bookings" -H "Content-Type: application/json" \
  -d '{"vehicleName":"Maruti Swift","vehicleType":"Car","startTime":9,"endTime":17,"customerName":"Rahul Sharma","customerEmail":"rahul@example.com","customerPhone":"+91 99XXX76655"}'
echo ""
curl -s -X POST "$API/bookings" -H "Content-Type: application/json" \
  -d '{"vehicleName":"Hyundai Creta","vehicleType":"SUV","startTime":10,"endTime":18,"customerName":"Priya Patel","customerEmail":"priya@example.com","customerPhone":"+91 99XXX76656"}'
echo ""
curl -s -X POST "$API/bookings" -H "Content-Type: application/json" \
  -d '{"vehicleName":"Royal Enfield Classic 350","vehicleType":"Bike","startTime":6,"endTime":12,"customerName":"Amit Kumar","customerEmail":"amit@example.com","customerPhone":"+91 99XXX76657"}'
echo ""
curl -s -X POST "$API/bookings" -H "Content-Type: application/json" \
  -d '{"vehicleName":"Honda City","vehicleType":"Sedan","startTime":8,"endTime":20,"customerName":"Sneha Reddy","customerEmail":"sneha@example.com","customerPhone":"+91 99XXX76658"}'
echo ""
curl -s -X POST "$API/bookings" -H "Content-Type: application/json" \
  -d '{"vehicleName":"Mercedes E-Class","vehicleType":"Luxury","startTime":10,"endTime":14,"customerName":"Vikram Singh","customerEmail":"vikram@example.com","customerPhone":"+91 99XXX76659"}'
echo ""
curl -s -X POST "$API/bookings" -H "Content-Type: application/json" \
  -d '{"vehicleName":"Honda Activa","vehicleType":"Scooter","startTime":7,"endTime":19,"customerName":"Neha Gupta","customerEmail":"neha@example.com","customerPhone":"+91 99XXX76660"}'
echo ""
echo "✅ 6 Bookings created"
echo ""
echo "🎉 All demo data inserted successfully!"
