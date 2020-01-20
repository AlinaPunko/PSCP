USE [MyBase]
GO

--ALTER TABLE [dbo].[SUBJECT] DROP CONSTRAINT [FK_SUBJECT_PULPIT1]
GO

/****** Object:  Table [dbo].[SUBJECT]    Script Date: 12/24/2019 10:46:43 AM ******/
--DROP TABLE [dbo].[SUBJECT]
GO

/****** Object:  Table [dbo].[SUBJECT]    Script Date: 12/24/2019 10:46:43 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SUBJECT](
	[SUBJECT_ID] [nvarchar](50) NOT NULL,
	[SUBJECT_NAME] [nvarchar](50) NOT NULL,
	[PULPIT] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_SUBJECT] PRIMARY KEY CLUSTERED 
(
	[SUBJECT_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[SUBJECT]  WITH CHECK ADD  CONSTRAINT [FK_SUBJECT_PULPIT1] FOREIGN KEY([PULPIT])
REFERENCES [dbo].[PULPIT] ([PULPIT_ID])
GO

ALTER TABLE [dbo].[SUBJECT] CHECK CONSTRAINT [FK_SUBJECT_PULPIT1]
GO


