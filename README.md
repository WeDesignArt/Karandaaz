# Karandaaz Web App

## **Installation**

**1. Install [Node.js](https://nodejs.org/en/download 'nodeJs download'):**

**2. Clone the Repository:**

Clone the project repository to your local machine. Navigate to the desired directory and run:

<pre><code><span style="color: yellow">git</span> clone [Repository URL]</code></pre>

**3. Navigate to Project Directory:**

Change your current working directory to the project folder:

<pre><code><span style="color: yellow">cd</span> [Project Folder Name]</code></pre>

**4. Install Dependencies:**

Install the necessary dependencies listed in the root package.json file by running the following command in the root directory:

<pre><code><span style="color: yellow">npm</span> install</code></pre>

**5. Setup Environment Variables:**

Create .env files in each of the packages directory. Refer to example env

**6. Run locally:**

<pre><code><span style="color: yellow">npm</span> run dev</code></pre>

## Technologies/Tools

- Typescript in Next.js
- GraphQL with Wordpress Backend
- Ant Design Framework for Pagination Only

### Custom WP Endpoints

- https://krndevelop.wpenginepowered.com/wp-admin/

Author Module

- Get blogs by author id
  - https://krndevelop.wpenginepowered.com/wp-json/custom/v1/blogs?author=${params?.info}
- Get user detailed information by user id
  - https://krndevelop.wpenginepowered.com/wp-json/custom/v1/user-by-id?id=${params?.info}
- Gets all authors
  - https://krndevelop.wpenginepowered.com/wp-json/custom/v1/users-by-role/?role=author

Global Search Module

- Retrieves all post results ( Show All) based on the user's search, with pagination using offset and page size.
  - https://krndevelop.wpenginepowered.com/wp-json/custom/v1/search?keyword=${searchText}&offset=${offset}&limit=${pageSize}

### WP Endpoints For Urdu

-https://krnur.wpenginepowered.com/wp-admin/
