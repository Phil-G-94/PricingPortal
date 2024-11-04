import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PodDisplayCard from "./PodDisplayCard.jsx";

function PodsDisplay({ podDataUpdateTrigger }) {
    const [podsData, setPodsData] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        try {
            const fetchPodsData = async () => {
                const response = await fetch(
                    "https://pricingportal.onrender.com/pods",
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
    }, [token, podDataUpdateTrigger]);

    return (
        <section>
            {responseMessage && <p>{responseMessage}</p>}

            <h3 style={{ textAlign: "center" }}>Your Saved Pods</h3>
            {podsData.map((pod) => {
                return <PodDisplayCard key={pod._id} pod={pod} />;
            })}
        </section>
    );
}

PodsDisplay.propTypes = {
    podDataUpdateTrigger: PropTypes.bool.isRequired,
};

export default PodsDisplay;
