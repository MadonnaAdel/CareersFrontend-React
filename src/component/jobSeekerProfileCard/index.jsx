import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../store/Slices/usersSlice';
import { Link, useParams } from 'react-router-dom';
import styles from './style.module.css';
import EduCard from '../EduCard/index'
import PrimaryButton from '../primaryButton';
import JobSeekerProfileItem from '../jobSeekerProfileItem';
import { SlLocationPin } from 'react-icons/sl';
import { CgWorkAlt } from 'react-icons/cg';
import { CgProfile } from 'react-icons/cg';
import { BiBookmarkAlt } from 'react-icons/bi';
import { GoClock } from 'react-icons/go';
import { FiPhoneCall } from 'react-icons/fi';
import { TbMail } from 'react-icons/tb';
import { GrFacebookOption } from 'react-icons/gr';
import { BiLogoLinkedin } from 'react-icons/bi';
import { BiEnvelope } from 'react-icons/bi';
import { UilEnvelopeAlt } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'
const JobSeekerProfileCard = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector((state) => state.users.user);
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);

    useEffect(() => {
        dispatch(fetchUserById(userId));
    }, [dispatch, userId]);



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!user) return <div>No user data available</div>;

    return (
        <div className={styles.mainCard}>
            <div className={`shadow-lg ${styles.mainCard_userImg}`}><img src={user.profilePhoto || "/default-profile.jpg"} alt="userProfile" /></div>
            <div className={styles.user}>
                <div className={styles.userDetails}>
                    <div className={styles.userDetails_name}>{user.firstName} {user.lastName}</div>
                    <div className={styles.userDetails_jobTitle}>{user.category}</div>
                </div>
                <div className='d-flex'> <a href="/public/Madonna-Adel.pdf" download><button className={`btn bg-green border-1 rounded-2 px-2 text-white ${styles.btnDownload}`} >Download CV</button></a> <Link to='/message'><div className='fs-4 ms-2'> <UilMessage size={ 32} /></div></Link></div>
            </div>
            <ul>
                <li><JobSeekerProfileItem width='100%' backgroundColor={'var(--border02)'} content={`${user.country}, ${user.city}`} icon={SlLocationPin} /></li>
                <li><JobSeekerProfileItem width='100%' content={user.category} backgroundColor={'var(--border03)'} icon={CgWorkAlt} /></li>
                <li><JobSeekerProfileItem width='100%' content={user.experienceLevel} backgroundColor={'var(--border03)'} icon={CgProfile} /></li>
                <li><JobSeekerProfileItem width='100%' content={user.qualifications} backgroundColor={'var(--border03)'} icon={BiBookmarkAlt} /></li>
                <li><JobSeekerProfileItem width='100%' content={user.desiredJobType} backgroundColor={'var(--border03)'} icon={GoClock} /></li>
            </ul>
            <ul >
                <li><div className={styles.contact_section_text}>Contact Info</div></li>
                {user.phone && 
                <li><JobSeekerProfileItem width='100%' content={user.phone} backgroundColor={'var(--border03)'} icon={FiPhoneCall} /></li>
                 }
                <li><JobSeekerProfileItem width='100%' content={user.email} backgroundColor={'var(--border03)'} icon={BiEnvelope} /></li>


            </ul>
            <ul>
                {
                    user?.socialMedia?.facebook && user?.socialMedia?.linkedin && 
                <li><div className={styles.contact_section_text}>Social Media</div></li>

                }
                <li className={styles.socialMedia_icons}>
                    {
                        user?.socialMedia?.facebook && 
                        <div className={styles.socialMedia_icon}>
                        
                        <a href={ user?.socialMedia?.facebook} target="_blank" rel="noopener noreferrer">

                            <GrFacebookOption className='text-white' />
                        </a>
                    </div>
                    }
                    

                    {
                        user?.socialMedia?.linkedin &&
                         <div className={styles.socialMedia_icon}>
                        <a href={user?.socialMedia?.linkedin} target="_blank" rel="noopener noreferrer">

                            <BiLogoLinkedin className='text-white' />
                        </a>

                    </div>
}
                   
                </li>
            </ul>
        </div>
    );
};

export default JobSeekerProfileCard;