import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import { useState, useEffect } from "react";
import axios from "axios";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}

function AuthorsTableData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/users/getUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const rows = users.map((user) => ({
    id: <Author image={team2} name={user.username} email={user.email} />,
    username: user.username,
    email: user.email,
    status: (
      <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container/>
    ),
    date: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium" >
        {user.date}
      </SoftTypography>
    ),
    action: (
      <SoftTypography
        component="a"
        href="#"
        variant="caption"
        color="secondary"
        fontWeight="medium"
    
      >
        Edit
      </SoftTypography>
    ),
  }));

  const columns = [
    { name: "id", align: "left" },
    { name: "username", align: "left" },
    { name: "email", align: "center" },
    { name: "status", align: "center" },
    { name: "date", align: "center" },
    { name: "action", align: "center" },
  ];

  return (
    <Table columns={columns} rows={rows} />
  );
}

export default AuthorsTableData;
