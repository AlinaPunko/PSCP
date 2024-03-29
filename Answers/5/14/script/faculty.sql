USE [MyBase]
GO

/****** Object:  Table [dbo].[FACULTY]    Script Date: 12/24/2019 10:43:07 AM ******/
--DROP TABLE [dbo].[FACULTY]
GO

/****** Object:  Table [dbo].[FACULTY]    Script Date: 12/24/2019 10:43:07 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FACULTY](
	[FACULTY_ID] [nvarchar](50) NOT NULL,
	[FACULTY_NAME] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_FACULTY] PRIMARY KEY CLUSTERED 
(
	[FACULTY_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


