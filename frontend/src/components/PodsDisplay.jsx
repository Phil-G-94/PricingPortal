import { useEffect, useState } from "react";

function PodsDisplay() {
    const [podsData, setPodsData] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        try {
            const fetchPodsData = async () => {
                const response = await fetch(
                    "http://localhost:8080/pods",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const jsonResponse = await response.json();

                if (!response.ok) {
                    const { message } = jsonResponse;

                    if (message) {
                        setResponseMessage(message);
                    }

                    return;
                }

                setPodsData(jsonResponse.pods);

                return jsonResponse;
            };

            fetchPodsData();
        } catch (err) {
            console.log(err);
        }
    }, [token]);

    return (
        <div>
            {responseMessage && <p>{responseMessage}</p>}

            {/*

                rework into card for each pod
                don't forget spec has two properties, baseComponents and resourceComponents
                which themselves contain nested objects...this will need to be extracted to be displayed properly...
                consider outsourcing into own component and prop drilling the podsData down

            */}
            <div>
                {podsData.map((pod) => {
                    return (
                        <div key={pod._id}>
                            <p>ID: {pod._id}</p>
                            <p>RESELLER PRICE: {pod.resellerPrice}</p>
                            <p>RETAIL PRICE: {pod.retailPrice}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PodsDisplay;
