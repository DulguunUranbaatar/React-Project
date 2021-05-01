import React, { Component } from 'react';
import { Control, Form, LocalForm, Errors } from 'react-redux-form';
import { Card, CardImg, CardText, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Label from 'reactstrap/lib/Label';
import Contact from './ContactComponent';


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


class CommentForm extends Component{

  constructor(props){
    super(props);


    this.state = {      
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
       
  }   

  toggleModal() {
      this.setState({
          isModalOpen: !this.state.isModalOpen
      });
  }

  handleLogin(event){
    alert(`rating: ${this.rating.value} author: ${this.author.value} text: ${this.text.value}`);
    this.toggleModal();
    event.preventDefault();
}

  render(){    
    return (
      <>
      <Button outline onClick={this.toggleModal}>
        < i className="fa fa-pencil fa-lg"/> Submit Comment
        </Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>        
          <ModalBody>
            <LocalForm onSubmit={this.handleLogin}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" id="rating" name="rating"                                   
                placeholder="select"                
                className="form-control">
                  <option selected>Select</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                </Control.select>                
              </div>
              <div className="form-group"> 
              <Label htmlFor="author">Your Name</Label>
                <Control.text model=".author" id="author" name="author"                       
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(15)
                    }}
                />
                <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    component="div"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be at least 2 characters',
                        maxLength: 'Must be 15 characters or less',
                    }}          
                />
              </div> 
              <div className="form-group">
                <Label htmlFor="text">Comment</Label> 
                <Control.textarea rows="6" model=".text" id="text" name="text"                
                className="form-control"
                />
              </div> 
                <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>        
      </Modal>
    </>
    );
    
   
  };
 
}

function RenderCampsite({campsite}) {
        return (
          <div className="col-md-5 m-1">
              <Card>
                  <CardImg top src={campsite.image} alt={campsite.name} />
                  <CardBody>
                      <CardTitle>{campsite.name}</CardTitle>
                      <CardText>{campsite.description}</CardText>
                  </CardBody>
              </Card>
          </div>
        );
    }
function RenderComments({comments}) {
      if (comments){
        return(
          <div className="col-md-5 m-1">
            <h4>Comments</h4>
            {comments.map(comment => {
                return(
                  <div key={comment.id}>
                    <p>{comment.text}<br/>
                    --{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </p>                          
                  </div>                  
                );
              })}  
              <CommentForm/>             
          </div>          
        );
      }
      return <div />      
    }

  function CampsiteInfo(props){
      if (props.campsite) {
          return (
            <div className="container">
              <div className="row">
                  <RenderCampsite campsite={props.campsite}/>
                  <RenderComments comments={props.comments}/>
              </div>
            </div>
          )
      }
      return <div/>;
  }

export default CampsiteInfo;