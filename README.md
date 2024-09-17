# Pricing Portal

Backend features a REST API, written using Node/Express and used to connect to a MongoDB database instance.

Currently, the endpoints retrieve information about a selection of hardware components (stored in the database) and then provide this information to the frontend in JSON format. This data is passed through via responses sent to GET/POST requests hitting those endpoints.

Frontend built using React library - powered by Vite frontend tooling.

At its most basic, the frontend displays the hardware component data and allows the user to submit a combination of this component data and return the total retail and reseller cost. The dual cost model derives from two commercial strategies typical to IT service providers.
