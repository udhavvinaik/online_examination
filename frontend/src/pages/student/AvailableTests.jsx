import React, { useEffect, useState } from 'react';
import { Card, Button, List, message, Spin, Tag } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AvailableTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/attempts/student', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTests(res.data);
    } catch (err) {
      console.error(err);
      message.error('Failed to load tests');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = async (testId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/attempts',
        { testId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Correct navigation using `attemptId`
      navigate(`/test/${res.data.attemptId}`, {
        state: {
          testData: res.data,
        },
      });
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || 'Failed to start test');
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  if (loading) {
    return <Spin style={{ display: 'block', margin: '100px auto' }} />;
  }

  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={tests}
      renderItem={(test) => (
        <List.Item>
          <Card
            title={test.title}
            extra={
              test.attempted ? (
                <Tag color="red">Attempted</Tag>
              ) : (
                <Tag color="green">Not Attempted</Tag>
              )
            }
          >
            <p>{test.description}</p>
            <p><strong>Duration:</strong> {test.duration} mins</p>
            <Button
              type="primary"
              onClick={() => handleStartTest(test._id)}
              disabled={test.attempted}
            >
              {test.attempted ? 'Already Attempted' : 'Start Test'}
            </Button>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default AvailableTests;
