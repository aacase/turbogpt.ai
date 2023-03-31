import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

const GitHubComponent = () => {
  const [token, setToken] = useState('');
  const [userRepos, setUserRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [repoFiles, setRepoFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      octokit.authenticate({ type: 'token', token: token });
      const response = await octokit.repos.list();
      const data = response.data;
      setUserRepos(data);
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedRepo) {
        const response = await octokit.repos.getContents({
          owner: octokit.auth.user.login,
          repo: selectedRepo,
        });
        const data = response.data;
        setRepoFiles(data.map(file => file.name));
        setSelectedFile('');
        setFileContent('');
      }
    };
    fetchData();
  }, [selectedRepo]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedFile) {
        const response = await octokit.repos.getContents({
          owner: octokit.auth.user.login,
          repo: selectedRepo,
          path: selectedFile,
        });
        let data = response.data.content;
        data = Buffer.from(data, 'base64').toString('utf-8');
        setFileContent(data);
      } else {
        setFileContent('');
      }
    };
    fetchData();
  }, [selectedFile]);

  const handleRepoChange = event => {
    setSelectedRepo(event.target.value);
  };

  const handleFileChange = event => {
    setSelectedFile(event.target.value);
  };

  const handleTokenChange = event => {
    setToken(event.target.value);
  };

  const renderOptions = list =>
    list.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ));

  const renderMarkup = text => (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: marked(text) }}
    />
  );

  return (
    <div className="app">
      <h1 className="header">GitHub Component</h1>
      <div className="form-group">
        <input
          type="text"
          value={token}
          placeholder="Enter a GitHub personal access token..."
          onChange={handleTokenChange}
        />
      </div>
      <div className="form-group">
        <label>Select a repository:</label>
        <select value={selectedRepo} onChange={handleRepoChange}>
          <option></option>
          {renderOptions(userRepos.map(repo => repo.name))}
        </select>
      </div>
      {selectedRepo && (
        <div className="form-group">
          <label>Select a file:</label>
          <select value={selectedFile} onChange={handleFileChange}>
            <option></option>
            {renderOptions(repoFiles)}
          </select>
        </div>
      )}
      {fileContent && (
        <div className="markdown-container">{renderMarkup(fileContent)}</div>
      )}
    </div>
  );
};

export default GitHubComponent;
