import * as React from "react";
import styled from "styled-components";
import CenteredContent from "~/components/CenteredContent";
import Header from "~/components/Header";
import PageTitle from "~/components/PageTitle";
import { EditorStyleHelper } from "@shared/editor/styles/EditorStyleHelper";

type Props = {
  /** An icon to display in the header when content has scrolled past the title */
  icon?: React.ReactNode;
  /** The title of the scene */
  title?: React.ReactNode;
  /** The title of the scene, as text – only required if the title prop is not plain text */
  textTitle?: string;
  /** A component to display on the left side of the header */
  left?: React.ReactNode;
  /** A component to display on the right side of the header */
  actions?: React.ReactNode;
  /** Whether to center the content horizontally with the standard maximum width (default: true) */
  centered?: boolean;
  /** Whether to use the full width of the screen (default: false) */
  wide?: boolean;
  /**
   * Width of the page content that the header aligns with. Defaults to the
   * standard width when centered, use it when the scene centers its own content.
   */
  contentWidth?: string;
  /** The content of the scene */
  children?: React.ReactNode;
};

const Scene: React.FC<Props> = ({
  title,
  icon,
  textTitle,
  actions,
  left,
  children,
  centered,
  wide,
  contentWidth,
}: Props) => (
  <FillWidth>
    <PageTitle title={textTitle ?? (typeof title === "string" ? title : "")} />
    <Header
      hasSidebar
      title={
        icon ? (
          <>
            {icon}&nbsp;{title}
          </>
        ) : (
          title
        )
      }
      actions={actions}
      left={left}
      contentWidth={
        contentWidth ??
        (centered !== false && !wide
          ? EditorStyleHelper.documentWidth
          : undefined)
      }
    />
    {centered !== false ? (
      <CenteredContent maxWidth={wide ? "100vw" : undefined} withStickyHeader>
        {children}
      </CenteredContent>
    ) : (
      children
    )}
  </FillWidth>
);

const FillWidth = styled.div`
  width: 100%;
`;

export default Scene;
