import React, { useState, useEffect } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import axios from "axios";
import team2 from "assets/images/team-2.jpg";
import { Padding } from "@mui/icons-material";
import { Modal } from "@mui/material";
import { Close } from '@mui/icons-material';
import IconButton from '@material-ui/core/IconButton';
import Icon from "@mui/material/Icon";
import { useAuth } from "auth-context/auth.context";

// ajoute recemment 



import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';





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

function SimpleTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [isModal2Open, setIsModal2Open] = useState(false);
 

 

  const handleComment = async (userId,user) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/comments/${userId}`);
      setComments(response.data);
      console.log(comments);
      setCurrentUser(user);
      setIsModal2Open(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // make DELETE request to delete user
    axios.delete(`http://127.0.0.1:8000/api/users/delete/${id}/`)
      .then((response) => {
        // update state by removing the deleted user
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleUpdate = () => {
    const updatedUser = {
      userID: currentUser.id,
      username: currentUser.username,
      email: currentUser.email,
      is_superuser:currentUser.is_superuser
    };
    // make PUT request to update user
    axios
      .put(`http://127.0.0.1:8000/api/users/edit/update_user/`, updatedUser)
      .then((response) => {
        // update state with updated user
        setUsers(
          users.map((user) => (user.id === currentUser.id ? { ...user, ...currentUser } : user))
        );
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleClose = () => {
    setSelectedUser(null);
    // setCurrentUser(null);
    setIsModalOpen(false);
  };
  const handleClose2 = () => {
    setSelectedUser(null);
    // setCurrentUser(null);
    setIsModal2Open(false);
  };



  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users/getUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th style={{ paddingLeft: "10px" }}>Utilisateur</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Status</th>
          <th style={{paddingLeft: "30px",margin: "305px"}}>Role</th>
          <th style={{paddingLeft: "60px",margin: "30px"}}>Date</th>
          <th style={{paddingLeft: "85px",margin: "338px"}}>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          
            <tr key={user.id}>
             <td><Author image={team2} name={user.username} email={user.email} /></td>
             <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
      <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container/>
           </td>
             <td style={{paddingLeft: "30px",margin: "305px"}}>
             {user.is_superuser ? (
                // <p>Admin</p>
                <SoftBadge variant="gradient" badgeContent="Admin" color="primary" size="xs" container/>
              ) : (
                // <p>Utilisateur normale</p>
                <SoftBadge variant="gradient" badgeContent="Utilisateur" color="secondary" size="xs" container/>
              )}
             </td>
             <td style={{paddingLeft: "30px",margin: "30px"}}>
             <SoftTypography variant="caption" color="secondary" fontWeight="medium" >
        {user.date}
      </SoftTypography>
            </td>
             <td style={{paddingLeft: "20px"}}>
            {/* <SoftTypography
                  component="button"
                  variant="caption"
                  color="secondary"
                  fontWeight="medium"
                  onClick={() => handleEdit(user)}
                >
                Edit
                </SoftTypography> */}
                <button type="submit" class="btn btn-primary" style={{paddingLeft: "15px"}} onClick={() => handleEdit(user)}> <Icon>edit</Icon></button>
                <button type="submit" class="btn btn-danger" style={{padding: "5px",marginLeft:"30px",width: "45px"}} onClick={() => handleDelete(user.id)}><Icon>delete</Icon></button>
                <button type="submit" class="btn btn-success" style={{padding: "5px",marginLeft:"30px",width: "45px"}} onClick={() => handleComment(user.id,user)}><Icon>comment</Icon></button>
            </td>
          </tr>
          ))}
          </tbody>
          {isModalOpen && (
            <Modal open={isModalOpen} onClose={handleClose}>
              <div className="container my-4" style={{ backgroundColor: "white", padding: "20px",maxWidth: "600px", borderRadius: "10px"  }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "-5px" }}>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </div>
                <center><h2>Modification d'utilisateur</h2></center>
                <form>
                  <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" class="form-control" id="username" placeholder="Entrer votre nom"
                      value={currentUser.username}
                      onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" id="email" placeholder="Entrer votre email" readOnly
                      value={currentUser.email}
                      onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <SoftBox mb={2}>
                      <select
                        name="is_superuser"
                        id="role"
                        onChange={(e) =>
                          setCurrentUser({ ...currentUser, is_superuser: e.target.value })
                        }
                        style={{
                          padding: "8px",
                          fontSize: "1rem",
                          border: "1px solid #87CEEB",
                          borderRadius: "4px",
                          backgroundColor: "#f7f7f7",
                          backgroundImage: "linear-gradient(to bottom, #87CEEB, #f7f7f7)",
                          width: "100%",
                          maxWidth: "300px",
                          margin: "0 auto",
                        }}
                      >
                        <option value="">-- Select a role --</option>
                        <option value="1">Admin</option>
                        <option value="0">Utilisateur normal</option>
                      </select>
                    </SoftBox>
                  </div>
                  <br/>
                  <div class="text-center">
                  <button type="submit" class="btn btn-primary" style={{width: "100px"}} onClick={handleUpdate}>Enregistrer</button>
                  </div>
                </form>
              </div>

            </Modal>
          )}

          {isModal2Open && (
            <Modal open={isModal2Open} onClose={handleClose2}>
              <div className="container my-4" style={{ backgroundColor: "white", padding: "20px",maxWidth: "600px", borderRadius: "10px"  }}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "-5px" }}>
                  <IconButton onClick={handleClose2}>
                    <Close />
                  </IconButton>
                </div>
                <center><h2>Liste des commentaires  <Icon>comment</Icon></h2></center>
                <form>
                  <br/>
                  {Array.isArray(comments.comments) && comments.comments.length > 0 ? (
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      {comments.comments.map((comment, index) => (
                        <React.Fragment key={index}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar alt={currentUser.username} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                              primary={comment}
                              secondary={currentUser.username}
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <p>Aucun commentaire trouvé.</p>
                  )}
                  {/* ajouter recement */}

               


   
 

                  {/* fin */}
                  <div className="text-center">
                    {/* <button type="submit" className="btn btn-primary" style={{width: "100px"}} onClick={handleUpdate}>Enregistrer</button> */}
                  </div>
                </form>
              </div>
            </Modal>
          )}

        </table>
      );

}

export default SimpleTable;