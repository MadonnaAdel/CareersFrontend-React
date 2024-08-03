import React, { useEffect, useState } from 'react';
import { Form, Button, Col, Row, Container, Card, ListGroup, Badge, InputGroup } from 'react-bootstrap';
import JobSeekerSidebar from '../JobSeekerSidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, fetchUsers } from '../../store/Slices/usersSlice';
import { UilAward } from '@iconscout/react-unicons'
import { UilUserSquare } from '@iconscout/react-unicons'
import EduCard from '../EduCard';

const ManageCV = () => {
    const userId = '6681e2ab75a50c5ecc4d8e02';
    const user = useSelector((state) => state.users.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserById(userId));
    }, [dispatch, userId]);

   
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid>
         
           
                    <h4 className="mt-4 mb-5">Manage CV</h4>
                    <Container>
                        {/* <UploadCV /> */}
                        <Education educationData={user.education} />
                        <WorkExperience workData={user.workAndExperience} />
                        {/* <Skills skillsData={user.skills} /> */}
                        <Button variant="success" className="mt-3">Save Changes</Button>
                    </Container>
           
        </Container>
    );
};

const Education = ({ educationData }) => {
    const [educationList, setEducationList] = useState([educationData[0] || {}]); // Initialize with the first element
    const [newEducation, setNewEducation] = useState({
        title: '',
        academy: '',
        from: '',
        to: '',
        description: ''
    });

    const addEducation = () => {
        
        setEducationList([...educationList, { ...newEducation }]);
        setNewEducation({
            title: '',
            academy: '',
            from: '',
            to: '',
            description: ''
        });
    };

    const handleChange = (field, value) => {
        setNewEducation({
            ...newEducation,
            [field]: value
        });
    };

    const currentYear = new Date().getFullYear();
    const fromDate = Array.from({ length: currentYear - 1989 }, (_, i) => (1990 + i).toString());
    const toDate = [...fromDate, "Present"];

    return (
        <>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title style={{ color: '#01A84D' }}>
                        <UilAward color='#01A84D' /> Education
                    </Card.Title>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newEducation.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Academy</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newEducation.academy}
                                    onChange={(e) => handleChange('academy', e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>From</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={newEducation.from}
                                    onChange={(e) => handleChange('from', e.target.value)}
                                >
                                    <option value="" disabled>Select Year</option>
                                    {fromDate.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>To</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={newEducation.to}
                                    onChange={(e) => handleChange('to', e.target.value)}
                                >
                                    <option value="" disabled>Select Year</option>
                                    {toDate.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newEducation.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                            />
                        </Form.Group>
                        <Button className='mb-3' variant="primary" onClick={addEducation}>
                            Add More
                        </Button>
                        {educationList.map((education, index) => (
                            <EduCard
                                key={index}
                                title={education.title}
                                academy={education.academy}
                                description={education.description}
                                from={education.from}
                                to={education.to}
                            />
                        ))}
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};


const WorkExperience = ({ workData }) => {
    const [workList, setWorkList] = useState(workData || []);
  const  dispatch= useDispatch()


    const [newWorkExperience, setNewWorkExperience] = useState({
        title: '',
        academy: '',
        from: '',
        to: '',
        description: ''
    });

    const addWorkExperience = () => {
        // dispatch(post)
        setWorkList([...workList, { ...newWorkExperience }]);
        setNewWorkExperience({
            title: '',
            academy: '',
            from: '',
            to: '',
            description: ''
        });
    };

    const handleChange = (field, value) => {
        setNewWorkExperience({
            ...newWorkExperience,
            [field]: value
        });
    };

    const currentYear = new Date().getFullYear();
    const fromDate = Array.from({ length: currentYear - 1989 }, (_, i) => (1990 + i).toString());
    const toDate = [...fromDate, "Present"];

    return (
        <>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title style={{ color: '#01A84D' }}>
                        <UilUserSquare color='#01A84D' /> Work & Experience
                    </Card.Title>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newWorkExperience.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Company</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newWorkExperience.academy}
                                    onChange={(e) => handleChange('company', e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>From</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={newWorkExperience.from}
                                    onChange={(e) => handleChange('from', e.target.value)}
                                >
                                    <option value="" disabled>Select Year</option>
                                    {fromDate.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>To</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={newWorkExperience.to}
                                    onChange={(e) => handleChange('to', e.target.value)}
                                >
                                    <option value="" disabled>Select Year</option>
                                    {toDate.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                    <option value="Present">Present</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newWorkExperience.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                            />
                        </Form.Group>
                        <Button className='mb-3' variant="primary" onClick={addWorkExperience}>
                            Add More
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {workList.map((work, index) => (
                <EduCard
                    key={index}
                    title={work.title}
                    academy={work.academy}
                    description={work.description}
                    from={work.from}
                    to={work.to}
                />
            ))}
        </>
    );
};





export default ManageCV;
